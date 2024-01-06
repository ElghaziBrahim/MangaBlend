import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { Link } from 'react-router-dom';

import {
  handleLogout,
  authenticateUser,
} from '../../functions';
import styles from './home.module.css';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    authenticateUser(userData, setUserData);
  }, []);
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <img src={logo} alt="MangaBlend" width="50px" />
        </div>
        <input type="text" name="search" placeholder="Search Something" />
        <div className={styles.headerfunctions}>
          <i className="fas fa-bell fa-xl"></i>
          <i className="fas fa-envelope fa-xl"></i>
        </div>
        <div className={styles.right}>
          {userData.username ? (
            <>
              <a onClick={handleLogout}>
                <i className="fas fa-right-to-bracket fa-xl"></i>
              </a>
              <div className={styles.username}>{userData.username}</div>
              <img
                src={profile}
                className={styles.profileImage}
                alt="profile picture"
                width="50px"
              />
            </>
          ) : (
            <a href="/login">
              <h3>Login</h3>
            </a>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.main}>

          < Posts userData={userData} community={"public"} />
        </div>

        <div className={styles.slider}>
          <input
            type="text"
            name="community_filter"
            placeholder="Filter"
          />
          <h6>Your Communities</h6>
          <ul>
            <li className={styles.community}>
              <Link to="/c/martialpeak">Martial Peak</Link>
            </li>
            <li className={styles.community}>
              <Link to="/c/nanomachine">Nano Machine</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Home;