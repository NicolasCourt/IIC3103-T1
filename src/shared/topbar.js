/* Ayuda de https://mui.com/material-ui/react-app-bar/ */

import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  brand: {
    display: { xs: 'none', md: 'flex' },
    fontWeight: 900,
    fontSize: '20px',
    letterSpacing: '.3rem',
    paddingTop: '0px !important',
  }
})

const pages = [{label: 'Trays', to: '/trays'}, {label: 'Courses', to: '/courses'}, {label: 'Ingredients', to: '/ingredients'}];

const Topbar = (props) => {

  const {
    setSearchedWord
  } = props

  const [value, setValue] = React.useState('')
  const history = useHistory();

  const classes = useStyles()

  const goToLink = (page) => {
    history.push(`${page.to}`);
    setValue('')
  }

  const handleTextChange = (e) => {
    setSearchedWord(e.target.value)
    setValue(e.target.value)
    if (e.target.value === ''){
      history.push('/trays')
    }
    if (e.target.value !== '' && history.location.pathname !== '/results'){
      history.push('/results')
    }
  }

  

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box
            className={classes.brand}
            sx={{ display: { xs: 'none', md: 'flex' }}}
          >
            Churrasic Park
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => goToLink(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <TextField id="outlined-basic" label="Search..." variant="outlined" value={value} onChange={handleTextChange}  />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Topbar;