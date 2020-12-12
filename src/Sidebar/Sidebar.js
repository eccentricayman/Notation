import React, { useState } from 'react';
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
import { FilterNone } from '@material-ui/icons';
import Amplify, { API, graphqlOperation, input } from 'aws-amplify'
import { createNote, deleteNote } from '../graphql/mutations.js'




class SidebarComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null,
            newNotetype: 0,
        };
    }
    render(){
        const {notes, classes, fileID, selectedNoteIndex} = this.props;
        console.log(this.state);
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
                                    defaultValue="New File"
                                    onChange={(e)=>this.updateFileName(e.target.value)}
                                />
                                <FormControl component="fieldset">
                                <FormLabel component="legend">Note Type: </FormLabel>
                                <RadioGroup aria-label="noteType" name="noteType" onChange={this.handleNoteType} value={this.state.newNotetype}>
                                    <FormControlLabel value={1} control={<Radio />} label="Quill" />
                                    <FormControlLabel value={0} control={<Radio />} label="Canvas" />
                                </RadioGroup>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closingNote} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={()=>this.newNote(this.state.title,this.state.newNotetype)} color="primary">
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
    newNote = async (title,newNotetype) => {
        //Insert database storing here
        /*
        try{
            var inp = {id:"", title:title, type:newNotetype, data:"", tags:"",users:"" }
            await API.graphql(graphqlOperation(createNote, {input:inp}));
        }catch(err){
            console.log("Error");
        }
        */
        
            //this.setState({title:null, addingNote: false});
        if (this.state.title === null){
            console.log('using default title')
            title = "New Note";
        };
        console.log('in newNote function');
        this.props.addNote(title, '', newNotetype);
        this.setState({title:null});
        this.setNoteType(newNotetype);
        this.closingNote();

    }
    selectNote = (note, index) =>{
        this.props.selectNote(note,index);
    }
    deleteNote = (note) => {
        this.props.deleteNote(note);
    }
    handleNoteType = (e) => {
        this.setState({newNotetype: Number(e.target.value)});
    }
    setNoteType = (newNotetype) =>{
        this.props.setNoteType(newNotetype);
    }
}
export default withStyles(styles)(SidebarComponent)