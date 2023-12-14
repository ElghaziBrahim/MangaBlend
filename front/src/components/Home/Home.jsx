// Home.js
import React from 'react';
import styles from './home.module.css';
import profile from "../../assets/profile.png"
import logo from "../../assets/logo.png"

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="MangaSocial Logo" className={styles.logo} />
        </div>
        <div className={styles.userProfile}>
          <img src={profile} alt="User Profile Picture" className={styles.profilePicture} />
          <span className={styles.username}>YourUsername</span>
        </div>
      </header>

      <div className={styles.container}>
        <aside className={styles.leftSlider}>
          <ul>
            <li className={styles.feature}>Settings</li>
            <li className={styles.feature}>Feed</li>
            <li className={styles.feature}>Groups</li>
            <li className={styles.feature}>Favorites</li>
          </ul>
        </aside>

        <main>
          <section className={styles.content}>
            <div className={styles.inputField}>
              <textarea placeholder="Share your thoughts..."></textarea>
              <button>Post</button>
            </div>
            <div className={styles.post}>
              <div className={styles.postAuthor}>
                <img src={profile} alt="User 1" className={styles.profilePicture} />
                <span className={styles.username}>User1</span>
              </div>
              <div className={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt justo vel lacinia facilisis.
              </div>
            </div>
            <div className={styles.post}>
              <div className={styles.postAuthor}>
                <img src={profile} alt="User 2" className={styles.profilePicture} />
                <span className={styles.username}>User1</span>
              </div>
              <div className={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt justo vel lacinia facilisis.
              </div>
            </div>
            <div className={styles.post}>
              <div className={styles.postAuthor}>
                <img src={profile} alt="User 3" className={styles.profilePicture} />
                <span className={styles.username}>User1</span>
              </div>
              <div className={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt justo vel lacinia facilisis.
              </div>
            </div>
          </section>
        </main>

        <aside className={styles.rightSlider}>
          <h2>Recent Chats</h2>
          <ul>
            <li>User3</li>
            <li>User4</li>
            {/* Add more recent chats as needed */}
          </ul>
        </aside>
      </div>

      <footer>
        &copy; 2023 MangaSocial. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
