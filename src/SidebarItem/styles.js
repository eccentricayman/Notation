const styles = theme => ({
  listItem: {
    cursor: 'pointer'
  },
  textSection: {
    maxWidth: '80%'
  },
  deleteIcon: {
    position: 'absolute',
    right: '17px',
    top: 'calc(50%-15px)',
      '&:hover': {
        color: 'red'
      }
  }
});

export default styles;