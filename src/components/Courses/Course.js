import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import Loader from "../../shared/loader";
import { calculateMeanRating } from '../../utils/functions'
import ReviewCard from "../../shared/reviewCard";
import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Form from '../../shared/form'
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
  ingredient: {
    color: '#1976d2',
    paddingLeft: '10px',
    paddingTop: '7px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.4)'
    }
  },
  ingredients: {
    display: 'flex',
    flexDirection: 'column !important',
    alignItems: 'flex-start',
    paddingTop: '50px'
  },
  ingredientsTitle: {    
    fontSize: '20px'
  },
  image: {
    width: '100%',
    aspectRatio: '3/2',
    objectFit: 'contain',
    mixBlendMode: 'color-burn',
    paddingRight: '20px',
    paddingBottom: '25px'
  },
  horizontal: {
    display: 'flex',
    paddingBottom: '10px'  
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column !important'
  },
  itemName: {
    paddingRight: '10px',
    fontWeight: '700'
  },
  verticalMain: {
    display: 'flex',
    flexDirection: 'column !important',
    padding: '40px',
    scale: 1,
  },
  itemMain: {
    fontSize: '50px',
    fontWeight: '700',
    paddingBottom: '40px',
    color: '#f5b63e',
  },
  imgContainer: {
    paddingRight: '20px'
  },
  reviewsContainer: {
    display: 'flex',
    flexDirection: 'column !important',
    paddingTop: '20px'  
  },
  reviewTitle: { 
    paddingBottom: '15px',
    paddingTop: '10px',
    fontSize: '25px'
  },
  description: {
    paddingBottom: '15px'
  }
})

const Course = (props) => {

  const id = props.match?.params?.id

  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState({})
  const [reviews, setReviews] = useState([])
  const [meanRating, setMeanRating] = useState('No tiene todavia')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(false)

  const [sort, setSort] = useState('date')
  const [asc, setAsc] = useState('Asc')
  const [sortedReviews, setSortedReviews] = useState([])

  const classes = useStyles()
  const history = useHistory()

  const ingredientPage = (id) => {
    history.push(`/ingredient/${id}`);
  }

  const handleChangeSort = (event) => {
    setSort(event.target.value)
    if (event.target.value === 'date'){
      setSortedReviews(reviews.sort((a, b) => asc === 'Asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date) ))
    } else {
      setSortedReviews(reviews.sort((a, b) => asc === 'Asc' ? a.rating - b.rating : b.rating - a.rating ))
    }
  }

  const handleChangeSortWay = (event) => {
    setAsc(event.target.value)
    if (sort === 'date'){
      setSortedReviews(reviews.sort((a, b) => event.target.value === 'Asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date) ))
    } else {
      setSortedReviews(reviews.sort((a, b) => event.target.value === 'Asc' ? a.rating - b.rating : b.rating - a.rating ))
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      const response = await get(`/courses/${id}`)
      if (response.status === 200){
        setCourse(response.data)
      }

      const responseReviews = await get(`/reviews/${id}`)
      if (responseReviews.status === 200){
        if (responseReviews.data.length > 0){
          setReviews(responseReviews.data)
          setSortedReviews(responseReviews.data.sort((a, b) => new Date(a.date) - new Date(b.date)))
          setMeanRating(calculateMeanRating(responseReviews.data))
        } 
      }
      setLoading(false)
    }

    fetchCourse()

  }, [id, reload])

  return (
    <div>
      {!loading ? 
        <div className={classes.verticalMain}>
          <a className={classes.itemMain}>{course.name}</a>
          <Grid container className={classes.horizontal}>
            <Grid item xs={12} md={7} className={classes.imgContainer}>
              <img className={classes.image} src={course.img_url} alt="new"/>
            </Grid>
            <Grid item xs={12} md={5} className={classes.vertical}>
              <div className={classes.vertical}>
              <div className={classes.horizontal}>
                  <a className={classes.description}>{course.description}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Category: </a>
                  <a className={classes.item}>{course.category}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Expiration: </a>
                  <a className={classes.item}>{course.expiration}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Price: </a>
                  <a className={classes.item}>${course.price}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Size: </a>
                  <a className={classes.item}>{course.size}</a>
                </div>
                <div className={classes.horizontal}>
                  <Rating readOnly name="rating" value={meanRating} precision={0.5} />
                </div>
              </div>
              <Grid item className={classes.ingredients}>
                <a className={classes.ingredientsTitle}> Ingredientes:</a>
                {course.ingredients.map((ingredient) => {
                  return (
                    <a className={classes.ingredient} onClick={() => ingredientPage(ingredient.id)}> {ingredient.name}</a>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.reviewsContainer}>
            <Grid className={classes.vertical}>
              <Grid className={classes.horizontal}>
                <a className={classes.reviewTitle}>Reviews</a>
                <IconButton onClick={() => setDrawerOpen(!drawerOpen)} size="large">
                  <AddIcon />
                </IconButton>
                <Drawer
                  anchor={'right'}
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(!drawerOpen)}
                >
                  <Form id={id} setModal={setDrawerOpen} setReload={setReload}/>
                </Drawer>
              </Grid>
              <Grid className={classes.horizontal}>
                <Select
                  id="s-1"
                  value={sort}
                  onChange={handleChangeSort}
                >
                  <MenuItem value={"date"}>Fecha</MenuItem>
                  <MenuItem value={"rate"}>Estrellas</MenuItem>
                </Select>
                <Select
                  id="s-2"
                  value={asc}
                  onChange={handleChangeSortWay}
                >
                  <MenuItem value={'Asc'}>Asc</MenuItem>
                  <MenuItem value={'Desc'}>Desc</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container className={classes.reviews}>
              {sortedReviews.map((review, index) => {
                return (
                  <ReviewCard key={index} review={review}/>
                )
              })}
            </Grid>
          </Grid>
        </div>

      : 
      <Loader />
      }
    </div>
  )

}

export default Course;