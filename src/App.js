import React from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import NoteComponent from './Notes/Notes';
import './App.css';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
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
      notes: [{title: "Testing Title", body: "abcdefghijklmnopqrstuvwxyz"}], //

    }
  }
  render(){
    return (
      <div className="notation-container">
        {/* <AmplifySignOut /> */}
        <SidebarComponent
          fileID={this.state.fileID}
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}></SidebarComponent>
			<NoteComponent></NoteComponent>
			<AmplifySignOut />

      </div>
    )
  }
  /*
  componentDidMount = () =>{
    //Connect the database with this
  }
  */
}

export default withAuthenticator(App);
