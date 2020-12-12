import { Block } from "@material-ui/icons";

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
    right: '17px',
    top: 'calc(50%-15px)',
      '&:hover': {
        color: 'red'
      }
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
    padding: '0 0 2% 2%'
  },
  tag: {
    marginRight: '3px',
  }
});

export default styles;