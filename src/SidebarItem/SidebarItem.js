import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

class SidebarItemComponent extends React.Component{
    selectNote = (note, index) => {
        this.props.selectNote(note, index);
    }
    
    deleteNote = (note) => {
        this.props.deleteNote(note);
    }
    render(){
        const {index, note, classes, selectedNoteIndex} = this.props;
        return(
            <div key={index}>
                <ListItem 
                className = {classes.listItem}
                selected={selectedNoteIndex === index}>
                    <div
                        className={classes.textSection}
                        onClick={() => {
                            this.selectNote(note,index);
                        }}>
                            <ListItemText
                            /*note.title is whatever name the note has
                            note.body is the contents of the note
                            primary = primary label for list item
                            secondary = subtext for listitem 
                            Shows preview for note contents*/
                                primary={note.title}
                                secondary={note.body.substring(0, 30) + '...'}>

                            </ListItemText>
                        
                    </div>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={()=>{
                            this.deleteNote(note);
                        }}>

                    </DeleteIcon>
                </ListItem>
            </div>
        
        );
    }
}

export default withStyles(styles)(SidebarItemComponent)