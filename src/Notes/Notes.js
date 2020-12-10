import React from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {Divider, Button } from '@material-ui/core';
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
                <Button
                    title="Clear"
                    onClick={this.clear}
                    className={classes.icon}><i class="fas fa-trash"></i>
                </Button>
                <Button
                    title="Undo"
                    onClick={this.undo}
                    className={classes.icon}><i class="fas fa-undo"></i>
                </Button>
                <Button
                    title="Edit Theme"
                    onClick={this.theme}
                    className={classes.icon}><i class="fas fa-brush"></i>
                </Button>

                <div className={classes.editor}>
                    <CanvasDraw ref={canvasDraw =>this.canvas = canvasDraw} canvasWidth="100%" canvasHeight="100%" lazyRadius="10"/> 
                </div>
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

    theme = () => {
        console.log("Theme");
    }
    clear = () => {
       this.canvas.clear();
    }
    undo = () =>{
        this.canvas.undo();
    }
}

export default withStyles(styles)(NotesComponent);