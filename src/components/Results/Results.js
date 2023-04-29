import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import Loader from "../../shared/loader";
import TrayCard from "../Trays/TrayCard";
import IngredientCard from "../Ingredients/IngredientCard";
import CourseCard from "../Courses/CourseCard";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  titleContainer:{
    display: 'flex',
    justifyContent: 'center'
  },
  tabBox: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: 1, 
    borderColor: 'divider'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '25px',
    fontSize: '35px',
    color: '#f5b63e',
    fontFamily: 'sans-serif'
  },
  resultContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Results = (props) => {

  const {
    searchedWord
  } = props

  const [loading, setLoading] = useState({})
  const [results, setResults] = useState({})
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles()

  useEffect(() => {
    const fetchData = async (searchedWord) => {
      setLoading(true)
      const [traysResponse, coursesResponse, ingredientsResponse] = await Promise.all([
        get(`/search/trays?name=${searchedWord}`),
        get(`/search/courses?name=${searchedWord}`),
        get(`/search/ingredients?name=${searchedWord}`),
      ]);
      const [trays, courses, ingredients] = await Promise.all([
        traysResponse.data,
        coursesResponse.data,
        ingredientsResponse.data,
      ]);
      if (!Array.isArray(trays)){
        setResults({ trays: [], courses: [], ingredients: [] });
      } else {
        setResults({ trays, courses, ingredients });
      }
      setLoading(false)
    };

    fetchData(searchedWord);

  }, [searchedWord]);

  return (
    <Grid container className={classes.container}>
      {!loading ?
        <div>
          <TabContext value={value}>
            <div>
              <Grid item xs={12} className={classes.titleContainer}>
                <a className={classes.title}>
                  Results
                </a>
              </Grid>
              <Box className={classes.tabBox}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Trays" value="1" />
                  <Tab label="Courses" value="2" />
                  <Tab label="Ingredients" value="3" />
                </TabList>
              </Box>
            </div>
            <TabPanel value="1">
              <Grid container className={classes.resultContainer}>
                {results.trays.map((tray) => {
                  return (
                    <TrayCard
                      tray={tray}
                    />
                  )
                })}
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container className={classes.resultContainer}>
                {results.courses.map((course) => {
                  return (
                    <CourseCard
                      course={course}
                    />
                  )
                })}
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid container className={classes.resultContainer}>
                {results.ingredients.map((ingredient) => {
                  return (
                    <IngredientCard
                      ingredient={ingredient}
                    />
                  )
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        </div> 
      : 
        <Loader />}
    </Grid>
  )
}

export default Results