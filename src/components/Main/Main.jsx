import React, { useState, useEffect, useContext, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import LoginPopup from '../LoginPopUp/LoginPopup';
import { Context } from '../../context/Context';

const Main = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [theme, setTheme] = useState('light'); // State to track the theme
  const cardsRef = useRef(null);

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

  const handleUserIconClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false);
  };

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: -cardsRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: cardsRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save theme preference in localStorage or state management (optional)
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`main ${theme}`}>
      <div className="nav">
      <p className={theme === 'dark' ? 'bright-text' : 'dark-text'}>Galaxia</p>
        {/* Switch Mode Icon */}
        <div className="switch-mode-icon" onClick={toggleTheme}>
  {theme === 'light' ? (
    <RiMoonLine className="light-mode-icon" /> // Dark Mode Icon
  ) : (
    <RiSunLine className="dark-mode-icon" /> // Light Mode Icon
  )}
</div>

        {user ? (
          <div className="user-icon-container" onClick={handleUserIconClick}>
            <img src={assets.user_icon} alt="User Icon" />
            {showLogout && (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        ) : (
          <button className="sign-in-button" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        )}
      </div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} register={register} login={login} />}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Galaxic..</span></p>
              <p>How can I help you today?</p>
            </div>
            {/* <button className="scroll-button left" onClick={scrollLeft}>&lt;</button> */}
            <div className="cards" ref={cardsRef}>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
            {/* <button className="scroll-button right" onClick={scrollRight}>&gt;</button> */}
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.galaxia_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
         
        </div>
        <p className="bottom-info">
            Galaxia may display inaccurate info, including about people, so double-check its responses. Your privacy and Galaxia Apps
          </p>
      </div>
    </div>
  );
};

export default Main;
