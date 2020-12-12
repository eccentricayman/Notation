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
import Chip from '@material-ui/core/Chip';
import {removeHTMLTags} from '../helpers.js';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class SidebarItemComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            deleteDialogOpen: false,
            shareDialogOpen: false,
            shareUser: "",
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

    deleteTag = (noteId, targetTag) => {
        this.props.deleteTag(noteId, targetTag);
    }

    shareOpen = () => {
        this.setState({shareDialogOpen: true});
    }
    
    shareClose = () => {
        this.setState({shareDialogOpen: false, shareUser:""});
    }

    updateShareUser = (user) =>{
        this.setState({shareUser:user});
    }
    shareNote = (note,user) => {
        this.props.shareNote(note,user);
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
                                secondary={removeHTMLTags(note.data.substring(0, 20)) + '...'}>

                            </ListItemText>
                        
                    </div>
                    <Icon 
                        className={classes.shareIcon}
                        onClick={() => {
                            this.shareOpen();
                        }} ><i class="fas fa-share"></i>
                    </Icon>
                    <Dialog
                        open={this.state.shareDialogOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="share-dialog-slide-title"
                        aria-describedby="share-dialog-slide-description"
                        onClose={this.shareClose}
                        fullWidth="md"
                    >
                        <DialogTitle id="share-dialog-slide-title">Share {note.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="share-dialog-slide-description">
                                Share with People
                            </DialogContentText>
                            <TextField
                                    autoFocus
                                    margin="dense"
                                    id="share User"
                                    label="Share User"
                                    type="text"
                                    fullWidth
                                    defaultValue=""
                                    onChange={(e) =>this.updateShareUser(e.target.value)}
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.shareClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                this.shareNote(note, this.state.shareUser);
                                this.shareClose();
                            }} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                <div className={classes.itemTagSection}>
                        {note.tags.map((tag, index) => {
                            return(
                                <Chip
                                    className={classes.tag}
                                    key={index}
                                    size="small"
                                    label={tag}
                                    onDelete={() => this.deleteTag(note.id, tag)}
                                />
                            )
                        })}
                </div>
            </div>
        
        );
    }
}

export default withStyles(styles)(SidebarItemComponent)