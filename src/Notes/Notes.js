import React from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {Divider, Button } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Block } from '@material-ui/icons';

class NotesComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            notes: "",
            fileName: "",
            fileID: "",
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
                    className={classes.icon}><i class="fas fa-trash"></i>
                </Button>
                <Button
                    title="Undo"
                    onClick={this.undo}
                    className={classes.icon}><i class="fas fa-undo"></i>
                </Button>
                <Popup trigger={
                    <Button
                        className={classes.icon}><i class="fas fa-brush"></i>
                    </Button>
                } modal nested>
                    {close => (
                        <div className={classes.modal}>
                            <button className={classes.close} onClick={close}>
                                &times;
                            </button>
                            <div className={classes.header}>Edit Theme</div>
                            <div className={classes.content}>
                                {' '}
                                Brush Color: <input type="color" value={this.state.brushColor} onChange={this.changeBrushColor}></input>
                                <br/>
                                Brush Radius: <input type="number" min="1" max="100" value={this.state.brushRadius} onChange={this.changeBrushRadius}></input>
                                <br/>
                                Lazy Radius: <input type="number" min="1" max="40" value={this.state.lazyRadius} onChange={this.changeLazyRadius}></input>
                                <br/>
                                Hide Grid: <input type="button" value={this.state.toggleGrid} onClick={this.hideGrid}></input>
                                <br/>
                                Canvas Color: <input type="color" value={this.state.canvasColor} onChange={this.changeCanvasColor}></input>
                                <br/>

                                
                                
                            </div>
                        </div>
                    )}
                </Popup>
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
    /* Storing something into the database
    updateBody = async (val) => {
        await this.setState({text:val});
        this.update();
    };
    */
    
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
        if (event.target.value < 0){
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