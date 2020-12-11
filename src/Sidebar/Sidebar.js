import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SidebarItemComponent from '../SidebarItem/SidebarItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class SidebarComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null
        };
    }
    render(){
        const {notes, classes, fileID, selectedNoteIndex} = this.props
        return(
            <div className={classes.sidebarContainer}>
                <Button
                    onClick={this.addingNote}
                    className={classes.addingNote}>{"Add Note"}
                </Button>
                {
                    this.state.addingNote ? 
                    <div>
                        <Dialog open={this.state.addingNote} onClose={this.closingNote} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Adding a new Note</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add a new note please input a file name and select which note taking application would you like to use, Quill or Canvas
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="note Name"
                                    label="File Name"
                                    type="text"
                                    fullWidth
                                />
                                <FormControl component="fieldset">
                                <FormLabel component="legend">Note Type: </FormLabel>
                                <RadioGroup aria-label="noteType" name="noteType" >
                                    <FormControlLabel value="true" control={<Radio />} label="Quill" />
                                    <FormControlLabel value="false" control={<Radio />} label="Canvas" />
                                </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closingNote} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.newNote, this.closingNote} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div> : null
                }
                <List>
                    {notes.map((note, index) => {
                        return(
                            <div key={index}>
                                <SidebarItemComponent
                                    note={note}
                                    index={index}
                                    fileID={fileID}
                                    selectedNoteIndex={selectedNoteIndex}
                                    selectNote={this.selectNote}
                                    deleteNote={this.deleteNote} />
                                <Divider></Divider>
                            </div>
                        );
                    })}
                </List>
                <div className={classes.verticalLine}></div>
            </div>
        );
    }
    /*
    This block of code is for when notes are within a database and the sidebar Items can appear
    <List>
        {
        notes.map((_note, _index) => {
            return(
                <div key={_index}>
                    <SidebarItemComponent
                        _note={_note}
                        _index={_index}
                        fileID={fileID}
                        selectNote={this.selectNote}></SidebarItemComponent>
                    <Divider></Divider>
                </div>
            );
        })
    }
    </List>
    */
    //Creates a blank new Note File
    addingNote = () => {
        this.setState({addingNote:!this.state.addingNote});
    }
    closingNote = () => {
        this.setState({addingNote:!this.state.addingNote});
    }
    updateFileName = (name) => {
        this.setState({title: name});
    }
    newNote = () => {
        //Insert database storing here
        //this.setState({title:null, addingNote: false});
        console.log("cool database stuff here")
    }
    selectNote = () =>{
        console.log("Select Note")
    }
    deleteNote = () => {
        console.log("Delete Note")
    }
}
export default withStyles(styles)(SidebarComponent)