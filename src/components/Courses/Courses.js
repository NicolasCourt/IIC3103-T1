import React, { useState, useEffect } from "react";
import { get } from '../../utils/api';
import CourseCard from "./CourseCard";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Loader from "../../shared/loader";

const useStyles = makeStyles({
  coursesContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '40px',
    paddingBottom: '20px'
  },
  filters: {
    display: 'flex'
  },
  filter: {
    paddingLeft: '5%'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px',
    fontSize: '35px',
    color: '#f5b63e',
    fontFamily: 'sans-serif'
  }
})

const Courses = (props) => {

  const [loading, setLoading] = useState(false)

  const [size, setSize] = useState(20)
  const [sort, setSort] = useState("name")
  const [order, setOrder] = useState("asc")

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(100000)
  const [courseList, setCourseList] = useState([])

  const classes = useStyles()

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({top: 0});
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value)
    setPage(1)
  }
  const handleChangeOrder = (event) => {
    setOrder(event.target.value)
    setPage(1)
  }
  const handleChangeSize = (event) => {
    setSize(event.target.value)
    setPage(1)
  }

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const response = await get(`/courses?sort=${sort}&order=${order}&page=${page}&size=${size}`)
      if (response.status === 200){
        setCourseList(response.data.items)
        setMaxPage(response.data.pages)
      }
      window.scrollTo({top: 0});
      setLoading(false)
    }

    fetchCourses()
  }, [page, sort, order, size])


  return (
    <div>
      {!loading ?
        <div>
          <div className={classes.title}>
            Courses
          </div>
          <div className={classes.filters}>
            <div className={classes.filter}>
              <a> Filtrar por</a>
              <Select
                id="s-1"
                value={sort}
                onChange={handleChangeSort}
              >
                <MenuItem value={"name"}>Nombre</MenuItem>
                <MenuItem value={"price"}>Precio</MenuItem>
              </Select>
            </div>
            <div className={classes.filter}>
              <a> Orden </a>
              <Select
                id="s-2"
                value={order}
                onChange={handleChangeOrder}
              >
                <MenuItem value={"asc"}>Ascendente</MenuItem>
                <MenuItem value={"desc"}>Descendente</MenuItem>
              </Select>
            </div>
            <div className={classes.filter}>
              <a> Platos por pagina </a>
              <Select
                id="s-3"
                value={size}
                onChange={handleChangeSize}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </div>
          </div>
          <Grid container className={classes.coursesContainer}>
            {courseList.map((course) => {
              return (
                <CourseCard
                  course={course}
                />
              )
            })}
          </Grid>
          <div className={classes.pagination}>
            <Pagination count={maxPage} page={page} onChange={handleChange} color="primary"/>
          </div>
        </div> : <Loader />
      }
    </div>
  )
}

export default Courses;