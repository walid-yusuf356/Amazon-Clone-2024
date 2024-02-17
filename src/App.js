import React, { useEffect, useContext } from 'react';
import './App.css';
import Routing from './Router';
import { DataContext } from './Component/DataProvider/DataProvider';
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        // the user just logged in / the user was logged in
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      }
      else {
        // the user is logged out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return <Routing />;
}

export default App;
