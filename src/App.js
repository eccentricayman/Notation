import React from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import NoteComponent from './Notes/Notes';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      /* TO-DO 
        Add a filePath once folders are made
        Add an owner and contributors when accounts registration are made
        Add Revision History (This sounds very complicated could delete)
        Add Tags once folders are made
        Add Themes (last feature) for aethetic purposes
      */
      fileID: null,
      fileName: null,
      notes: null, //

    }
  }
  render(){
    return (
      <div class="notation-container">
        <SidebarComponent
          fileID={this.state.fileID}
          notes={this.state.notes}></SidebarComponent>
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

export default App;
