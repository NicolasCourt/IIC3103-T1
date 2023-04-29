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


const IngredientCard = (props) => {

  const {
    ingredient
  } = props

  const classes = useStyles()
  const history = useHistory();

  const handleClick = () => {
    history.push(`/ingredient/${ingredient.id}`);
  }

  return (
    <Grid key={ingredient.id} xs={12} md={3} item className={classes.cardContainer} onClick={handleClick}> 
      <img className={classes.image} src={ingredient.img_url} alt="new"/>
      <Grid container className={classes.information}>
        <Grid item xs={8} className={classes.name}>{ingredient.name}</Grid>
        <Grid item xs={4} className={classes.amount}>${ingredient.price}</Grid>
      </Grid>
    </Grid>
  )

}

export default IngredientCard;
