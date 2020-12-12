import React from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {Divider, Button, Popover, Input, Slider, Grid } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'
import "reactjs-popup/dist/index.css";
import { Block } from '@material-ui/icons';

import debounce from '../helpers.js';
import ReactQuill from 'react-quill';

<<<<<<< HEAD
//import EditorToolbar, {modules, formats } from "./QuillToobar.js";
import 'react-quill/dist/quill.snow.css';

=======
>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
class NotesComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            data: "",
            fileName: "",
            fileID: "",
            //Theme menu
            anchorEl: null,
            //Theme values
            lazyRadius:"1",
            brushColor:"#000000",
            brushRadius:"5",
            toggleGrid:false,
            canvasColor:"rgba(150,150,150,.3)"
        };
<<<<<<< HEAD
        this.modules = {
            toolbar: [
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'list': 'ordered'}, {'list': 'bullet'},
              {'indent': '-1'}, {'indent': '+1'}],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['link', 'image', 'video'],
              ['clean']
            ]
        };
    
        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
            'script', 'sub', 'super',
            'list', 'ordered', 'bullet', 'indent',
            'align',
            'color', 'background',
            'link', 'image', 'video'
          ];
        
=======

>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
    }
    
    componentDidMount = () => {
        this.setState({
            data: this.props.selectedNote.data,
            fileName: this.props.selectedNote.title,
            fileID: this.props.selectedNote.id,
        });
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.fileID){
            this.setState({
                data: this.props.selectedNote.data,
                fileName: this.props.selectedNote.title,
                fileID: this.props.selectedNote.id,
            });
        }
    }
<<<<<<< HEAD
    
=======
>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
    render(){
        const {classes, quill} = this.props;
        return (
            <div className={classes.editorContainer}>
                {
                    quill ?
                    <div className={classes.quillContainer}>
<<<<<<< HEAD
                        {/* <EditorToolbar /> */}
                        <ReactQuill 
                            value={this.state.data}
                            onChange={this.updateData}
                            modules={this.modules}
                            formats={this.formats}
                            theme={"snow"}/>
=======
                        <ReactQuill 
                            value={this.state.data}
                            onChange={this.updateData}></ReactQuill> 
>>>>>>> 92434eff0623ed4dd702441fa7961d272a1fdbff
                    </div>
                        : null
                }


                {
                    !quill ? 
                    <div className={classes.canvasContainer}>
                        <Button
                            title="Clear"
                            onClick={this.clear}
                            className={classes.icon}><i className="fas fa-trash"></i>
                        </Button>
                        <Button
                            title="Undo"
                            onClick={this.undo}
                            className={classes.icon}><i className="fas fa-undo"></i>
                        </Button>
                        <Button
                            aria-describedby={Boolean(this.state.anchorEl) ? "themeMenu-popover" : undefined}
                            className={classes.icon} 
                            onClick={this.openThemeMenu}>
                                <i className="fas fa-brush"></i>
                        </Button>
                        <Popover
                            id={Boolean(this.state.anchorEl) ? "themeMenu-popover" : undefined}
                            open={Boolean(this.state.anchorEl)}
                            anchorEl={this.state.anchorEl}
                            onClose={this.closeThemeMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}>
                            
                            <div className={classes.modal}>
                                <div className={classes.header}>Edit Theme</div>
                                <div className={classes.content}>
                                    <Grid container spacing={0} justify="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <div className={classes.menuItemName}><h4>Brush Color:</h4></div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <input type="color" value={this.state.brushColor} onChange={this.changeBrushColor}></input>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.menuItemName}><h4>Brush Radius:</h4></div>
                                        </Grid>
                                        <Grid container item xs={12} spacing={2}>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={this.state.brushRadius} 
                                                    onChange={(e,newValue)=>{this.setState({brushRadius:newValue})}} 
                                                    aria-labelledby="brush-radius-slider"
                                                    min={1}
                                                    max={20}/>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input 
                                                    value={this.state.brushRadius} 
                                                    onChange={this.changeBrushRadius}
                                                    inputProps={{
                                                        step: 1,
                                                        min: 1,
                                                        max: 20,
                                                        type: 'number',
                                                        'aria-labelledby': 'brush-radius-slider',
                                                    }}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.menuItemName}><h4>Lazy Radius:</h4></div>
                                        </Grid>
                                        <Grid container item xs={12} spacing={2}>
                                            <Grid item xs={6}>
                                                <Slider 
                                                    value={this.state.lazyRadius} 
                                                    onChange={(e,newValue)=>{this.setState({lazyRadius:newValue})}} 
                                                    aria-labelledby="lazy-radius-slider"
                                                    min={1}
                                                    max={40}/> 
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input 
                                                    value={this.state.lazyRadius} 
                                                    onChange={this.changeLazyRadius}
                                                    inputProps={{
                                                        step: 1,
                                                        min: 1,
                                                        max: 40,
                                                        type: 'number',
                                                        'aria-labelledby': 'lazy-radius-slider',
                                                    }}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    
                                </div>
                            </div>
                        </Popover>
                        <div className={classes.editor}>
                            <CanvasDraw ref={canvasDraw =>this.canvas = canvasDraw} 
                                canvasWidth="100%" 
                                canvasHeight="100%" 
                                lazyRadius={this.state.lazyRadius}
                                brushColor={this.state.brushColor}
                                brushRadius={this.state.brushRadius}
                                hideGrid={this.state.toggleGrid}
                                gridColor={this.state.canvasColor}
                            /> 
                        </div>
                    </div> : null
                    }
            </div>
        );
    }
    // Storing something into the database
    updateData = async (val) => {
        await this.setState({data:val});
        this.update();
    };

    //Controls when database gets updated i.e. 3 seconds after keyboard inactivity
    update = debounce(() => {
        //insert code to update to database
        console.log('updating database');
        this.props.updateNote({
            id: this.state.fileID,
            title: this.state.fileName,
            data: this.state.data
        })
    }, 1500);

    //Toggle theme menu
    openThemeMenu = (e) => {
        this.setState({anchorEl: e.currentTarget});
    }

    closeThemeMenu = () => {
        this.setState({anchorEl: null});
    }
    
    //End of toggle theme menu

    
    changeBrushColor = event => {
        this.setState(
            {
                brushColor:event.target.value
            }
        );
        this.canvas.brushColor = this.state.brushColor
    }
    changeBrushRadius = event => {
        if (event.target.value > 100){
            event.target.value = 100;
        }
        if (event.target.value < 1){
            event.target.value = 1;
        }
        this.setState(
            {
                brushRadius: event.target.value
            }
        );
        this.canvas.brushRadius = this.state.brushRadius;
    }
    changeLazyRadius = event => {
        if (event.target.value > 40){
            event.target.value = 40;
        }
        if (event.target.value < 0){
            event.target.value = 1;
        }
        this.setState(
            {
                lazyRadius: event.target.value
            }
        );
        this.canvas.lazyRadius = this.state.lazyRadius;
    }
    clear = () => {
       this.canvas.clear();
    }
    undo = () =>{
        this.canvas.undo();
    }
    
}

export default withStyles(styles)(NotesComponent);