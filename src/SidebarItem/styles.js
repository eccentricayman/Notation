const styles = theme => ({
  listItem: {
    cursor: 'pointer',
    minHeight: '85px'
  },
  textSection: {
    maxWidth: '80%'
  },
  deleteIcon: {
    position: 'absolute',
    zIndex: '99',
    right: '17px',
    top: 'calc(50%-15px)',
      '&:hover': {
        color: 'red'
      }
  },
  addIcon: {
    marginRight: '2px',
  },
  shareIcon:{
    position: "absolute",
    right: "45px",
    top: 'calc(50%-15px)',
      '&:hover': {
        color: 'blue'
      }
  },
  itemTagSection: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  tag: {
    marginRight: '3px',
  }
});

export default styles;