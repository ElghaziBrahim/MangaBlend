import React from 'react';
import styles from './home.module.css';
import logo from "../../assets/logo.png"
import profile from "../../assets/profile.png"
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const AuthUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/isuserauth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.message === 'logged') {
          console.log('User logged in');
        } else {
          console.log('User is not logged in');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    AuthUser()
  }, []);
  const posts = [
    {
      user: 'Brahim',
      timePosted: '22 hours ago',
      title: 'This is why Martial arts is the best Manga of all time',
      content: [
        '1: Character Development: Many martial arts manga delve deep into the characters\' backgrounds, motivations, and personal growth. Readers often connect with the characters on an emotional level as they overcome challenges and evolve.',
        '2: Philosophical Elements: Martial arts stories often incorporate philosophical elements, such as discipline, honor, and perseverance. The characters may follow a code of conduct or adhere to specific martial arts philosophies, adding depth to the narrative.',
        '3: Diverse Settings and Styles: Martial arts manga explores a variety of martial arts styles, each with its unique techniques and philosophies. This diversity allows for creative storytelling and introduces readers to different aspects of martial arts culture.',
      ],
      comments: 113,
    }, {
      user: 'Brahim',
      timePosted: '22 hours ago',
      title: 'This is why Martial arts is the best Manga of all time',
      content: [
        '1: Character Development: Many martial arts manga delve deep into the characters\' backgrounds, motivations, and personal growth. Readers often connect with the characters on an emotional level as they overcome challenges and evolve.',
        '2: Philosophical Elements: Martial arts stories often incorporate philosophical elements, such as discipline, honor, and perseverance. The characters may follow a code of conduct or adhere to specific martial arts philosophies, adding depth to the narrative.',
        '3: Diverse Settings and Styles: Martial arts manga explores a variety of martial arts styles, each with its unique techniques and philosophies. This diversity allows for creative storytelling and introduces readers to different aspects of martial arts culture.',
      ],
      comments: 113,
    }, {
      user: 'Brahim',
      timePosted: '22 hours ago',
      title: 'This is why Martial arts is the best Manga of all time',
      content: [
        '1: Character Development: Many martial arts manga delve deep into the characters\' backgrounds, motivations, and personal growth. Readers often connect with the characters on an emotional level as they overcome challenges and evolve.',
        '2: Philosophical Elements: Martial arts stories often incorporate philosophical elements, such as discipline, honor, and perseverance. The characters may follow a code of conduct or adhere to specific martial arts philosophies, adding depth to the narrative.',
        '3: Diverse Settings and Styles: Martial arts manga explores a variety of martial arts styles, each with its unique techniques and philosophies. This diversity allows for creative storytelling and introduces readers to different aspects of martial arts culture.',
      ],
      comments: 113,
    }
  ]
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
          {/* Assuming user is an object with a username property */}
          {/* {user.username ? (
            <>
              <a href="/logout">
                <i className="fas fa-right-to-bracket fa-xl"></i>
              </a>
              <div className={styles.username}>{user.username}</div>
              <img src="/pics/profile.png" className={styles.profileImage} alt="profile picture" width="50px" />
            </>
          ) : ( */}
          <a href="/login">
            <h3>Login</h3>
          </a>
          {/* )} */}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.create}>
            <img src={profile} alt="profile picture" />
            <input type="text" name="new_post" placeholder="Create Post" />
          </div>

          <div className={styles.filters}>
            <div className={styles.filter}>
              <i className="fas fa-rocket fa-2x"></i>
              <h4>Best</h4>
            </div>
            <div className={styles.filter}>
              <i className="fas fa-fire fa-2x"></i>
              <h4>Hot</h4>
            </div>
            <div className={styles.filter}>
              <i className="fas fa-sun fa-2x"></i>
              <h4>New</h4>
            </div>
          </div>

          <div className={styles.posts}>
            {posts.map((post, index) => (
              <div key={index} className={styles.post}>
                <div className={styles.source}>
                  <img src={profile} alt="profile picture" />
                  <div className={styles.userpost}>{post.user}</div>
                  <div className={styles.timeposted}>{post.timePosted}</div>
                </div>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.content}>
                  {post.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.feathers}>
                  <div className={styles.comments}>
                    <i className="fa-solid fa-message fa-2xl"></i>
                    <div className={styles.comments_number}>{post.comments} comments</div>
                  </div>
                  {/* Add share and save functionality as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.slider}>
          <input type="text" name="community_filter" placeholder="Filter" />
          <h6>Your Communities</h6>
          <ul>
            {["Martial Peak", "Nano Machine", "One Piece", "Attack On Titan", "Dragon Ball"].map((community) => (
              <li key={community} className={styles.community}>
                {community}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
