const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 2px black',
  },
  editorContainer: {
    float: 'right',
    height: '100%',
    width: 'calc(100% - 300px)',
    boxSizing: 'border-box',
    zIndex:'0'
  },
  editor:{
    float: 'right',
    width: '100%',
    height: '100%',
    boxSizing:'border-box'
  },
  icon:{
    '&:hover': {
      backgroundColor: '#88a2ce'
    },
    width:"30px"
  },
  modal:{
    fontSize:'20px'
  },
  header:{
    width:"100%",
    borderBotton: "1px solid gray",
    fontSize:"32px",
    textAlign:"center",
    padding:"5px"
  },
  content:{
    width:"100%",
    padding:"10px 5px"
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