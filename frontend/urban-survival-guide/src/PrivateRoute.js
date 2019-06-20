import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({component: Component, loggedIn, ...rest}) {
  return (
    <Route
        {...rest}
      render={(props) =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
}

export default PrivateRoute;
