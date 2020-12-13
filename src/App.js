import React, {useState} from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import NoteComponent from './Notes/Notes';
import './App.css';
//import Register from './components/auth/Register.js';
//import Login from './components/auth/Login.js';

import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Auth } from 'aws-amplify';
import { listNotes, getNote } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation, updateNote as updateNoteMutation } from './graphql/mutations';


/*
  function App() {
  return (
  <div className="App">
  <Register />
  </div>
  );
*/
class App extends React.Component{
	constructor(){
		super();
		this.state = {
			/* TO-DO 
			  Add a filePath once folders are made
			  Add an owner and contributors when accounts registration are made
			  Add Tags once folders are made
			  Add Themes (last feature) for aethetic purposes
			*/
			fileID: null,
			title: null,
			selectedNoteIndex: null,
			selectedNote: null,
			notes: [], //
			currentNewId: 3,
			//True for react Quill, False for React-Canvas, default is false
			quill:true,
		};
	}


    //need to figure out how to get notes to use this function
    fetchNotes = async () => {
        const apiData = await API.graphql({ query: listNotes });
        this.setState({notes: this.state.notes.concat(apiData['data']['listNotes']['items']), fetched: true});
    }

	
	  addNote = async (title, data, type) => {
          let note = {title: title, data: data, type: type, tags: [], editors: []};
		  let postedNote = await API.graphql({ query: createNoteMutation, variables: { input: note } });
        await this.setState(prevState => ({
            notes: [...prevState.notes, postedNote['data']['createNote']],
        }));
        let id = postedNote['data']['createNote']['id'];
        let noteIndex = this.state.notes.findIndex((note) => note.id === id);
        this.setState({selectedNote: this.state.notes[noteIndex], selectedNoteIndex: noteIndex, currentNewId: id});
        if (!type && !this.state.quill){
            this.noteComponent.clear();
		    }
    }
    
    selectNote = (note, index) => {
        this.setState({selectedNoteIndex: index, selectedNote: note, quill: note.type});
        if (!note.type && !this.state.quill){
            this.noteComponent.clear();
        }
    }
	
    deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({
            notes: this.state.notes.filter( (aNote) => aNote !== note)
        });
        if(this.state.selectedNoteIndex === noteIndex){
            this.setState({selectedNoteIndex: null, selectedNote: null});
        }
		const toDelete = {
			id: note['id'],
		};
        await API.graphql({ query: deleteNoteMutation, variables: { input: toDelete } });
    }
    
    updateNote = (noteObject) => {

      let notes = [...this.state.notes];
      const index = notes.findIndex((note) => note.id === noteObject.id);
      const noteToUpdate = {...notes[index]};

      noteToUpdate.data = noteObject.data;
      noteToUpdate.title = noteObject.title;
      noteToUpdate.type = noteObject.type;
      notes[index] = noteToUpdate;
      this.setState({notes: notes});
      const updateMap = {
        id: noteToUpdate.id,
        title: noteToUpdate.title,
        data: noteToUpdate.data,
        type: noteToUpdate.type
      };
      API.graphql({ query: updateNoteMutation, variables: { input: updateMap } });
    };
    
    addTag = (noteId, newTag) => {
      let notes = [...this.state.notes];
      const index = notes.findIndex((note) => note.id === noteId);
      const noteToUpdate = {...this.state.notes[index]};
      const updatedTags = [...noteToUpdate.tags, newTag];
      noteToUpdate.tags = updatedTags;
      notes[index] = noteToUpdate;
      this.setState({notes: notes});
      const updateMap = {
        id: noteToUpdate.id,
              tags: updatedTags
      };
      API.graphql({ query: updateNoteMutation, variables: { input: updateMap } });
    }

    deleteTag = (noteId,targetTag) => {
		let notes = [...this.state.notes];
		const index = notes.findIndex((note) => note.id === noteId);
		const noteToUpdate = {...this.state.notes[index]};
		const newTags = noteToUpdate.tags.filter( (tag) => tag !== targetTag);
		noteToUpdate.tags = newTags;
		notes[index] = noteToUpdate;
		this.setState({notes: notes});
        const updateMap = {
			id: noteToUpdate.id,
            tags: newTags
		};
        API.graphql({ query: updateNoteMutation, variables: { input: updateMap } });
    }
    
    shareNote = (note,user) => {
		const updateMap = {
			id: note.id,
			editors: note.editors.concat(user)
		};
		API.graphql({ query: updateNoteMutation, variables: { input: updateMap } });
    }

	componentDidMount() {
		this.fetchNotes();
	}

	//componentDidChange() {
	//this.printNotes();
	//}
	
	render(){
	    //	if (this.props.authState == "signedIn") {
		return (
			<AmplifyAuthenticator usernameAlias="email">
                <AmplifySignUp
                    slot="sign-up"
                    usernameAlias="email"
                    formFields={[
                        {
                            type: "name",
                            label: "Name",
                            placeholder: "McLovin",
                            required: true,
                        },
                        {
                            type: "email",
                            label: "Email",
                            placeholder: "notationgang@example.com",
                            required: true,
                        },
                        {
                            type: "password",
                            label: "Password",
                            placeholder: "********",
                            required: true,
                        },
                    ]} 
                />
                <AmplifySignIn slot="sign-in" usernameAlias="email" />
                
				<div className="notation-container">
				    <div id="side-menu">
				        <AmplifySignOut/>
				    </div>
				    <SidebarComponent
                        setNoteType={this.setNoteType}
                        fileID={this.state.fileID}
                        notes={this.state.notes}
                        selectedNoteIndex={this.state.selectedNoteIndex}
                        addNote={this.addNote}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}
                        addTag={this.addTag}
                        deleteTag={this.deleteTag}
                        shareNote={this.shareNote}></SidebarComponent>
				    { this.state.selectedNote ?
				      <NoteComponent 
				          ref={noteComponent =>this.noteComponent = noteComponent}
				          quill = {this.state.quill}
				          selectedNote={this.state.selectedNote}
				          selectedNoteIndex={this.state.selectedNoteIndex}
				          notes={this.state.notes}
				          updateNote={this.updateNote}></NoteComponent> :
				      <div className="none-selected">Please choose a note to view or create a new one!</div>
				    }
                    
			    </div>
                
			</AmplifyAuthenticator>
		);
		//}
    }
    
    setNoteType = (newNotetype) =>{
        var val = Boolean(newNotetype);
        this.setState({
            quill:val
        });
    }
	/*
	  componentDidMount = () =>{
	  //Connect the database with this
	  }
	*/
}

export default App;
//export default withAuthenticator(App, { usernameAttributes: 'email', signUpConfig, includeGreetings: true });
