import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

import styles from './home.module.css';

const Home = () => {

  const [userData, setUserData] = useState([]);
  function authUser(user) {
    setUserData(user)
  }
  return (
    <div>
      <Navbar authUser={authUser} />
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