
import React from "react";

import { makeStyles } from '@mui/styles';

import Topbar from "./topbar";

const useStyles2 = makeStyles({
  childrenContainer: {
    marginTop: '70px',
    width: '100%',
    height: '100%',
    backgroundColor: '#fbfbfb !important',
    minHeight: '90vh',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgb(0 0 0 / 30%)',
    paddingTop: '20px',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0 !important',
    padding: '20px'
  },
  mainContainer: {
  },
  inner: {
    boxShadow: '0px 2px 4px rgb(0 0 0 / 30%)',
    backgroundColor: 'white !important'
  }
});

const useStyles = makeStyles({
  childrenContainerTwo: {
    paddingTop: '80px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '0rem',
    paddingTop: '40px',
  },
  mainContainer: {
    padding: '50px',
    background: '#f0f0f0'
  },
  subContainer: {
    boxShadow: '0px 2px 4px rgb(0 0 0 / 30%)',
    backgroundColor: 'white !important',
    paddingTop: '50px',
    minHeight: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});


const Content = (props) => {
  
  const {
    setSearchedWord
  } = props

  const classes = useStyles()


  return (
    <div className={classes.mainContainer}>
      <Topbar setSearchedWord={setSearchedWord} />
      <div className={classes.childrenContainerTwo}>
        <div className={classes.container}>
          <div className={classes.subContainer}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content;
