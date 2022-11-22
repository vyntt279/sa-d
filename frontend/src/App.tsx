import './App.css';
import LogIn from './pages/auth/LogIn';
import Home from './pages/customer/home/Home'
import MainRoom from 'pages/admin/MainRoom';
import { Fragment } from 'react';

const App = () => {
  return (
    // <LogIn />
    <Fragment>

      <Home />
      <MainRoom/>

    </Fragment>
  );
}

export default App;
