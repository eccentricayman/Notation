import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class SidebarItemComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            deleteDialogOpen: false,
        };
    }

    selectNote = (note, index) => {
        this.props.selectNote(note, index);
    }
    
    deleteNote = (note) => {
        this.props.deleteNote(note);
    }

    dialogOpen = () => {
        this.setState({deleteDialogOpen: true});
    }

    dialogClose = () => {
        this.setState({deleteDialogOpen: false});
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
                            note.data is the contents of the note
                            primary = primary label for list item
                            secondary = subtext for listitem 
                            Shows preview for note contents*/
                                primary={note.title}
                                secondary={note.data.substring(0, 30) + '...'}>

                            </ListItemText>
                        
                    </div>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={this.dialogOpen}>
                    </DeleteIcon>
                    <Dialog
                        open={this.state.deleteDialogOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.dialogClose}
                        aria-labelledby="delete-dialog-slide-title"
                        aria-describedby="delete-dialog-slide-description"
                    >
                        <DialogTitle id="delete-dialog-slide-title">{"Are you sure you want to delete this note?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-dialog-slide-description">
                                Once deleted you will never be able to recover this note. 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.dialogClose} color="primary">
                                No
                            </Button>
                            <Button onClick={() => {
                                this.deleteNote(note);
                                this.dialogClose();
                            }} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
            </div>
        
        );
    }
}

export default withStyles(styles)(SidebarItemComponent)