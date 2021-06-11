import React from 'react';
import { Redirect } from 'react-router-dom';

const signOut = () => {
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user');
  }
  return <Redirect to="/signIn" />;
 
}

export default signOut;
