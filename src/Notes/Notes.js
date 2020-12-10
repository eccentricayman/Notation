import React from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'

import debounce from '../helpers.js';

class NotesComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: "",
            fileName: "",
            fileID: ""
        };

    }

    render(){
        const {classes} = this.props;
        return (
        <div className={classes.editorContainer}>
            <ReactQuill 
                value={this.state.text} 
                onChange={this.updateBody}
            ></ReactQuill>
        </div>
        );
    }
    // Storing something into the database
    updateBody = async (val) => {
        await this.setState({text:val});
        this.update();
    };

    //Controls when database gets updated i.e. 3 seconds after keyboard inactivity
    update = debounce(() => {
        //insert code to update to database
        console.log('updating database');
    }, 3000);

   
}

export default withStyles(styles)(NotesComponent);