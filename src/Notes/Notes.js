import React from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {Divider, Button, Popover, Input, Slider, Grid } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Block } from '@material-ui/icons';

import debounce from '../helpers.js';

class NotesComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: "",
            fileName: "",
            fileID: "",
            //Theme menu
            anchorEl: null,
            //Theme values
            lazyRadius:"1",
            brushColor:"#000000",
            brushRadius:"5",
            toggleGrid:true,
            canvasColor:"rgba(150,150,150,.3)"
        };

    }
    
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.editorContainer}>
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

    //Toggle theme menu
    openThemeMenu = (e) => {
        this.setState({anchorEl: e.currentTarget});
    }

    closeThemeMenu = () => {
        this.setState({anchorEl: null});
    }
    
    //End of toggle theme menu

    theme = () => {
        console.log("Theme");
    }
    
    changeBrushColor = event => {
        this.setState(
            {
                brushColor:event.target.value
            }
        );
        this.canvas.brushColor = this.state.brushColor
    }
    //Needs fixing
    changeCanvasColor = event => {

        this.setState(
            {
                canvasColor: event.target.value
            }
        );
        this.canvas.gridColor = this.state.canvasColor;
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
    //Needs fixing
    hideGrid = event => {
        this.state.toggleGrid = !this.state.toggleGrid;
        this.value = this.state.toggleGrid;
        this.canvas.hideGrid = this.state.toggleGrid;
    }
    clear = () => {
       this.canvas.clear();
    }
    undo = () =>{
        this.canvas.undo();
    }
}

export default withStyles(styles)(NotesComponent);