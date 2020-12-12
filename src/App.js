import React from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import NoteComponent from './Notes/Notes';
import './App.css';
//import Register from './components/auth/Register.js';
//import Login from './components/auth/Login.js';

import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';

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
      fileName: null,
      selectedNoteIndex: null,
      selectedNote: null,
      notes: [{id: 1, title: "Testing Title", data: "<p>abcdefghijklmnopqrstuvwxyz</p>", type: 0},
      {id: 2, title: "Testing Title 2", data: "<p>Hello world</p>", type: 0}], //
      currentNewId: 3,
    }
  }
  addNote = async (title, data, type) => {
    let id = this.state.currentNewId;
    console.log(id);
    await this.setState(prevState => ({
      notes: [...prevState.notes, {id: id, title: title, data: data, type: type}],
    }));
    //console.log(this.state.notes);
    let noteIndex = this.state.notes.findIndex((note) => note.id === id);
    //console.log(noteIndex);
    id++;
    console.log(id);
    this.setState({selectedNote: this.state.notes[noteIndex], selectedNoteIndex: noteIndex, currentNewId: id})
    //console.log(this.state.notes);
  }

  selectNote = (note, index) => this.setState({selectedNoteIndex: index, selectedNote: note});

  deleteNote = (note) => console.log("delete note");

  updateNote = (noteObject) => {
    // console.log(noteObject);
    let notes = [...this.state.notes];
    const index = notes.findIndex((note) => note.id === noteObject.id);
    const noteToUpdate = {...notes[index]};
    // console.log('NOTE TO UPDATE');
    // console.log(noteToUpdate);
    // console.log(index);
    noteToUpdate.data = noteObject.data;
    noteToUpdate.title = noteObject.title;
    notes[index] = noteToUpdate;
    this.setState({notes: notes});
  };
	render(){
	    //	if (this.props.authState == "signedIn") {
    console.log(this.state);
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
          <SidebarComponent
            fileID={this.state.fileID}
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            addNote={this.addNote}
            selectNote={this.selectNote}
            deleteNote={this.deleteNote}></SidebarComponent>
          { this.state.selectedNote ?
            <NoteComponent 
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              updateNote={this.updateNote}></NoteComponent> :
              <div className="none-selected">Please choose a note to view or create a new one!</div>
          }
                    <AmplifySignOut/>
				</div>
                
			</AmplifyAuthenticator>
		);
		//}
	}
	/*
	  componentDidMount = () =>{
	  //Connect the database with this
	  }
	*/
}

export default App;
//export default withAuthenticator(App, { usernameAttributes: 'email', signUpConfig, includeGreetings: true });
