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
      notes: [{title: "Testing Title", body: "abcdefghijklmnopqrstuvwxyz", type: 0}], //

    }
  }
  addNote = (title, body, type) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, {title: title, body: body, type: type}]
    }));
    console.log(this.state.notes);
  }

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
          <SidebarComponent
            fileID={this.state.fileID}
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            addNote={this.addNote}></SidebarComponent>
          <NoteComponent></NoteComponent>
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
