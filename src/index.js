import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import debounce from 'lodash/debounce';

import Content from './shared/content';

import Courses from './components/Courses/Courses'
import Course from './components/Courses/Course'
import Trays from './components/Trays/Trays';
import Tray from './components/Trays/Tray';
import Ingredients from './components/Ingredients/Ingredients';
import Ingredient from './components/Ingredients/Ingredient';
import Results from './components/Results/Results'

function App() {
  const [searchedWord, setSearchedWord] = useState('');

  const debouncedSetSearchedWord = debounce(setSearchedWord, 500);


  return (
    <Router>
      <Content setSearchedWord={debouncedSetSearchedWord}>
        <Switch>
          <Route exact path="/" component={Trays} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/course/:id" component={Course} />
          <Route exact path="/trays" component={Trays} />
          <Route exact path="/tray/:id" component={Tray} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Route exact path="/ingredient/:id" component={Ingredient} />
          <Route
            path="/results"
            render={() => <Results searchedWord={searchedWord} />}
          />
        </Switch>
      </Content>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));