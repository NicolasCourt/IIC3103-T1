import React, { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import { post } from "../utils/api";
import { createTheme, makeStyles } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

const theme = createTheme();

const useStyles = makeStyles(theme => ({
  containerReview: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '150px',
    paddingLeft: '150px',
    paddingTop: '75px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '150px',
      paddingLeft: '150px'
    }
  },
  textFieldContainerReview: {
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  titleReview: {
    color: '#f5b63e',
    fontSize: '30px',
    fontWeight: '700',
    paddingBottom: '40px'
  },
  button: {
    paddingTop: '35px'
  }
}))


const Form = (props) => {

  const {
    id,
    setModal,
    setReload
  } = props

  const [body, setBody] = useState({
    "entity_id": id,
    "email": "",
    "password": "",
    "content": "",
    "rating": 0
  })
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("Success")
  const [severity, setSeverity] = useState("success")

  const classes = useStyles()

  const handleTextChange = (e) => {
    setBody({... body, [e.target.name]: e.target.value})
  }

  const handleForm = async () => {
    if (body["email"] === "" || body["password"] === "" || body["content"] === ""){
      setSeverity("warning")
      setMessage("No pueden haber campos vacios")
      setOpen(true)
    } else {
      const response = await post("/reviews", body)
      if (response.status === 400){
        setSeverity("error")
        setMessage(response.data.detail)
        setOpen(true)
      } else if (response.status === 200) {
        setSeverity("success")
        setMessage("Review creada con exito")
        setOpen(true)
        setModal(false)
        setReload(true)
        setReload(false)
      } else {
        setSeverity("error")
        setMessage("Oops, ocurrio un problema")
        setOpen(true)
      }
    }
  }

  return (
    <div className={classes.containerReview}>
      <a className={classes.titleReview}> Deja tu reseña!</a>
      <div className={classes.textFieldContainer}>
        <TextField id="standard-basic-1" name="email" label="Email" variant="standard" value={body["email"]} onChange={handleTextChange}  />
      </div>
      <div className={classes.textFieldContainer}>
        <TextField id="standard-basic-2" name="password" label="Password" variant="standard" value={body["password"]} onChange={handleTextChange}  />
      </div>
      <div className={classes.textFieldContainer}>
        <Rating
          name="simple-controlled"
          value={body["rating"]}
          onChange={(event, newValue) => {
            setBody({ ...body, "rating": newValue });
          }}
        />
      </div>
      <div className={classes.textFieldContainerReview}>
        <TextField id="standard-basic-3" name="content" label="Content" variant="standard" multiline value={body["content"]} onChange={handleTextChange}  />
      </div>
      <div className={classes.button}>
        <Button  onClick={handleForm}>
          Enviar
        </Button>
      </div>
      
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(!open)}>
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Form