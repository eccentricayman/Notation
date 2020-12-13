import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import {removeHTMLTags} from '../helpers.js';
import Icon from '@material-ui/core/Icon';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class SidebarItemComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            deleteDialogOpen: false,
            addTagDialogOpen: false,
            currentTagName: null,
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

    addTag = (noteId, newTag) => {
        this.props.addTag(noteId, newTag);
    }

    deleteTag = (noteId, targetTag) => {
        this.props.deleteTag(noteId, targetTag);
    }

    tagDialogOpen = () => {
        this.setState({addTagDialogOpen: true});
    }

    tagDialogClose = () => {
        this.setState({addTagDialogOpen: false})
    }

    updateTagName = (tagName) => {
        this.setState({currentTagName: tagName})
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
                selected={selectedNoteIndex === index}
                onClick={() => {
                    this.selectNote(note,index);
                }}>
                    <div
                        className={classes.textSection}>
                            <ListItemText
                            /*note.title is whatever name the note has
                            note.data is the contents of the note
                            primary = primary label for list item
                            secondary = subtext for listitem 
                            Shows preview for note contents*/
                                primary={note.title}
                                secondary={removeHTMLTags(note.data.substring(0, 20)) + '...'}>

                            </ListItemText>
                            <ListItemText
                                primary={
                                    <div className={classes.itemTagSection}>
                                        <AddIcon
                                            className={classes.addIcon}
                                            onClick={this.tagDialogOpen}>
                                        </AddIcon>
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
                                }></ListItemText>
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
                    <Dialog 
                        open={this.state.addTagDialogOpen} 
                        onClose={this.tagDialogClose}
                        TransitionComponent={Transition}
                        keepMounted 
                        aria-labelledby="tag-dialog-title"
                        aria-describedby="tag-dialog-slide-description">
                        <DialogTitle id="tag-dialog-title">Add a tag!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Associate this note with any tags to help you organize your notes!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="tagName"
                                label="New Tag"
                                type="text"
                                fullWidth
                                onChange={(e)=>this.updateTagName(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.tagDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={()=>{
                                this.addTag(note.id, this.state.currentTagName);
                                this.tagDialogClose();
                            }} color="primary">
                                Add Tag
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
            </div>
        
        );
    }
}

export default withStyles(styles)(SidebarItemComponent)