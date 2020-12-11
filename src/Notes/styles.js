const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 2px black',
  },
  quillContainer:{
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
  },
  editorContainer: {
    float: 'right',
    height: '100%',
    width: 'calc(100% - 300px)',
    boxSizing: 'border-box',
  },
  canvasContainer: {
    float: 'right',
    height: '100%',
    width: "100%",
    boxSizing: 'border-box',
  },
  editor:{
    float: 'right',
    width: '100%',
    height: '100%',
    boxSizing:'border-box',
  },
  icon:{
    '&:hover': {
      backgroundColor: '#88a2ce'
    },
    width:"30px"
  },
  modal:{
    fontSize:'15px',
    width: '250px',
    maxHeight: '300px',
  },
  header:{
    backgroundColor: '#57068C',
    color: '#f2f2f2',
    width:"100%",
    borderBotton: "1px solid gray",
    fontSize:"1.3rem",
    textAlign:"center",
    padding:"5px",
    fontFamily: "Verdana, sans-serif",
  },
  content:{
    width:"100%",
    padding:"10px"
  },
  menuItemName:{
    fontFamily: "Verdana, sans-serif",
  },
  actions:{
    width:"100%",
    padding:"10px 5px",
    margin:"auto",
    textAlign: "center"
  },
  close:{
    cursor:"pointer",
    position:"absolute",
    display:"block",
    padding: "2px 5px",
    lineHeight:"20px",
    right:"-10px",
    top:"-10px",
    fontSize:"28px",
    background:"#ffffff",
    border:"1px solid #cfcece"
  }
});

  export default styles;