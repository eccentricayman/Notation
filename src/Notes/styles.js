const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 0px 2px black',
  },
  editorContainer: {
    float: 'right',
    height: '100%',
    width: 'calc(100% - 300px)',
    boxSizing: 'border-box'
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
  }
});

  export default styles;