import React from 'react';

const AuthContext = React.createContext({
  //* It is good practice to have default values on the context object
  isLoggedIn: false,
  onLogout: () => {},
});

export default AuthContext;
