import './App.css';
import LogIn from './pages/auth/LogIn';
import Home from './pages/customer/home/Home'
import Admin from 'pages/admin/Admin';
import { Fragment } from 'react';

const App = () => {
  return (
    // <LogIn />
    <Fragment>

      <Home />
      <Admin/>

    </Fragment>
  );
}

export default App;
