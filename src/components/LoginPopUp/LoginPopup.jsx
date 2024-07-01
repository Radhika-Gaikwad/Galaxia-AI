import React, { useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin, register, login }) => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentState === 'Login') {
      const response = login(data.email, data.password);
      if (response.success) {
        setShowLogin(false);
      } else {
        alert(response.message);
      }
    } else {
      register(data);
      setShowLogin(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <button type="button" onClick={() => setShowLogin(false)} className="close-button">
            &times;
          </button>
        </div>
        {currentState === 'Sign Up' && (
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={data.name}
            onChange={onChangeHandler}
            className="login-popup-input"
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={data.email}
          onChange={onChangeHandler}
          className="login-popup-input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          className="login-popup-input"
          required
        />
        <button type="submit" className="login-popup-button">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        <p className="login-popup-switch">
          {currentState === 'Login' ? (
            <>
              Create a New Account?{' '}
              <span onClick={() => setCurrentState('Sign Up')} className="login-popup-link">
                Click Here
              </span>
            </>
          ) : (
            <>
              Already have an Account?{' '}
              <span onClick={() => setCurrentState('Login')} className="login-popup-link">
                Login Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
