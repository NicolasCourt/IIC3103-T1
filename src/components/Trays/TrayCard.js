import React from "react";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  cardContainer: {
    margin: '10px !important',
    textAlign: 'center',
    padding: '20px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '40px 40px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease',
    transform: 'scale(0.95)',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
      boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  information: {
    paddingTop: '25px',
    paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  description: {
    paddingTop: '10px',
    textAlign: 'initial',
  },
  image: {
    width: '100%',
    aspectRatio: '3/2',
    objectFit: 'contain',
    mixBlendMode: 'color-burn'
  },
  name: {
    textAlign: 'initial',
    fontSize: '25px',
  },
  amount: {
    textAlign: 'end',
    fontWeight: 'bold',
    fontSize: '17px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

const TrayCard = (props) => {

  const {
    tray
  } = props

  const classes = useStyles()
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tray/${tray.id}`);
  }

  return (
    <Grid key={tray.id} xs={12} sm={6} md={4} lg={3} item className={classes.cardContainer} onClick={handleClick}> 
      <div>
        <Grid container className={classes.information}>
          <Grid item xs={8} className={classes.name}>{tray.name}</Grid>
          <Grid item xs={4} className={classes.amount}>${tray.price}</Grid>
        </Grid>
      </div>
    </Grid>
  )

}

export default TrayCard;
