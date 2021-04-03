
import { Redirect, Route, Switch } from 'react-router-dom';

import './normalize.css';
import './App.scss';
import './api/api-config';
import { ROUTES } from './constants';
import { User } from './pages/User/User';
import { Users } from './pages/Users/Users';

function App() {
  return (
    <div className='container'>
      <h1>GitHub Searcher</h1>
      <Switch>
        <Route exact path='/' component={Users} />
        <Route path={`${ROUTES.user}/:username?`} component={User} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
