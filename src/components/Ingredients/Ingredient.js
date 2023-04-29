import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import { makeStyles } from "@mui/styles";
import Loader from "../../shared/loader";
import { calculateMeanRating } from '../../utils/functions'
import { Grid } from "@mui/material";
import ReviewCard from "../../shared/reviewCard";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Form from '../../shared/form'
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
  course: {
    color: '#f5b63e',
    paddingLeft: '10px',
    paddingTop: '7px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  courses: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '50px'
  },
  coursesTitle: {    
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

const Ingredient = (props) => {

  const id = props.match?.params?.id

  const [loading, setLoading] = useState(true)
  const [ingredient, setIngredient] = useState({})
  const [reviews, setReviews] = useState([])
  const [meanRating, setMeanRating] = useState('No tiene todavia')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(false)

  const [sort, setSort] = useState('date')
  const [asc, setAsc] = useState('Asc')
  const [sortedReviews, setSortedReviews] = useState([])

  const classes = useStyles()

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
    const fetchTray = async () => {
      setLoading(true)
      const response = await get(`/ingredients/${id}`)
      if (response.status === 200){
        setIngredient(response.data)
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

    fetchTray()

  }, [id, reload])

  return (
    <div>
      {!loading ? 
        <div className={classes.verticalMain}>
          <a className={classes.itemMain}>{ingredient.name}</a>
          <Grid container className={classes.horizontal}>
            <Grid item xs={12} md={5}>
              <img className={classes.image} src={ingredient.img_url} alt="new"/>
            </Grid>
            <Grid item xs={12} md={7} className={classes.vertical}>
              <div className={classes.vertical}>
                <div className={classes.horizontal}>
                  <a className={classes.description}>{ingredient.description}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Expiration: </a>
                  <a className={classes.item}>{ingredient.expiration}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Price: </a>
                  <a className={classes.item}>${ingredient.price}</a>
                </div>
                <div className={classes.horizontal}>
                  <a className={classes.itemName}>Size: </a>
                  <a className={classes.item}>{ingredient.size}</a>
                </div>
                <div className={classes.horizontal}>
                  <Rating readOnly name="rating" value={meanRating} precision={0.5} />
                </div>
              </div>
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

export default Ingredient;
