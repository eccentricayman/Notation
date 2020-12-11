import React from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import NoteComponent from './Notes/Notes';
import './App.css';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
/*
function App() {
  return (
    <div className="App">
      <Register />
    </div>
  );
*/
export default class App extends React.Component{
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
    console.log(this.state);
    return (
      <div className="notation-container">
        {/* <AmplifySignOut /> */}
        <SidebarComponent
          fileID={this.state.fileID}
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          addNote={this.addNote}></SidebarComponent>
        <NoteComponent></NoteComponent>

      </div>
    )
  }
  /*
  componentDidMount = () =>{
    //Connect the database with this
  }
  */
}

//export default withAuthenticator(App);
