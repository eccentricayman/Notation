const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 40px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  filterContainer: {
    padding: '7px',
  },
  addingNote: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#88a2ce'
    },
    width: '100%',
    height: '40px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    backgroundColor: '#57068C',
  },
  sidebarContainer: {
    marginTop: '0px',
    width: '300px',
    height: '100%',
    boxSizing: 'border-box',
    float: 'left',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  newNoteFileName: {
    width: '300px',
    height: '40px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    '&:focus': {
      outline: '2px solid black'
    }
  },
  newNoteSubmitBtn: {
    width: '100%',
    backgroundColor: '#57068C',
    borderRadius: '0px',
    color: 'white'
  },
  verticalLine: {
    borderRight: '2px solid black',
    height: '100%'
  }
});

export default styles;