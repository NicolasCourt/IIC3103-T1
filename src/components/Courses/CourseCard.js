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
    border: '1px solid #D9D9D9',
    padding: '20px',
    boxSizing: 'border-box',
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
    fontSize: '20px',
  },
  amount: {
    textAlign: 'end',
    fontWeight: 'bold',
    fontSize: '17px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageContainer: {
    backgroundColor: 'transparent'
  }
})

const CourseCard = (props) => {
  const {
    course 
  } = props

  const classes = useStyles()
  const history = useHistory();

  const handleClick = () => {
    history.push(`/course/${course.id}`);
  }

  return (
    <Grid xs={12} md={3} item key={course.id} className={classes.cardContainer} onClick={handleClick}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={course.img_url} alt="new"/>
      </div>
      <Grid container className={classes.information}>
        <Grid item xs={8} className={classes.name}>{course.name}</Grid>
        <Grid item xs={4} className={classes.amount}>{course.price ? `$${course.price}` : course.category}</Grid>
      </Grid>
    </Grid>
  )

}

export default CourseCard;