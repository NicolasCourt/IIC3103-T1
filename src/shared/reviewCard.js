import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

const useStyles = makeStyles({
  container: {
    paddingRight: '20px',
    paddingBottom: '20px',
    paddingTop: '15px',
    paddingBottom: '25px',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  horizontal: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  variable: {
    fontWeight: 'bold'
  },
  userName: {
    fontSize: '20px',
    color: '#f5b63e',
    paddingBottom: '5px'
  },
  date: {
    fontSize: '14px',
  },
  content: {
    paddingBottom: '10px',
    paddingTop: '10px',
    fontSize: '14px',
    fontWeight: '500'
  },
  horizontalSuper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  avatarContainer: {
    paddingRight: '20px'
  }
})

const ReviewCard = (props) => {

  const {
    review,
    key
  } = props

  const classes = useStyles()

  return (
    <Grid key={key} item xs={12} sm={6} md={3} className={classes.container}>
      <Grid className={classes.horizontalSuper}>
        <Grid className={classes.avatarContainer}>
          <Avatar sx={{ bgcolor: deepOrange[500],width: 56, height: 56 }}>{review.username.split(' ')[0][0]+review.username.split(' ')[1][0]}</Avatar>
        </Grid>
        <Grid>
          <Grid className={classes.horizontal}>
            <a className={classes.userName}>{review.username}</a>
          </Grid>
          <Grid className={classes.horizontal}>
            <Rating readOnly name="read-only-rating" value={review.rating} precision={1} />
          </Grid>
          <Grid className={classes.horizontal}>
            <a className={classes.content}>{review.content}</a>
          </Grid>
          <Grid className={classes.horizontal}>
            <a className={classes.date}>~{review.date.split(".")[0]}</a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewCard;