import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is logged in when the app loads
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (data) => {
    localStorage.setItem(data.email, JSON.stringify(data));
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const login = (email, password) => {
    const storedData = JSON.parse(localStorage.getItem(email));
    if (storedData && storedData.password === password) {
      setUser(storedData);
      localStorage.setItem('user', JSON.stringify(storedData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <>
      <Sidebar />
      <Main user={user} register={register} login={login} logout={logout} />
    </>
  );
};

export default App;
