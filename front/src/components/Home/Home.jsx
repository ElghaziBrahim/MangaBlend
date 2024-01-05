import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  handleLogout,
  authenticateUser,
  addPost,
  getPosts,
  timeAgo,
  openComments,
  addNewComment,
} from '../../functions';
import styles from './home.module.css';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [isAddPost, setIsAddPost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleNewPost = (e) => {
    e.preventDefault();
    setIsAddPost(false);

    const post = {
      title: postTitle,
      content: postContent,
    };

    setPostContent('');
    setPostTitle('');
    addPost(post, setPosts);
  };
  useEffect(() => {
    authenticateUser(userData, setUserData);
    getPosts(setPosts);
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
          {userData.username ? (
            isAddPost ? (
              <form onSubmit={handleNewPost} className={styles.formNewPost}>
                <div
                  className={styles.removeAddPost}
                  onClick={() => setIsAddPost(false)}
                >
                  x
                </div>
                <input
                  type="text"
                  onChange={(e) => setPostTitle(e.target.value)}
                  value={postTitle}
                  name="title"
                  id="new_post_title"
                  placeholder="title"
                />
                <input
                  type="text"
                  onChange={(e) => setPostContent(e.target.value)}
                  value={postContent}
                  name="content"
                  contentEditable="true"
                  id={styles.new_post_content}
                  placeholder="content"
                />
                <button type="submit">post</button>
              </form>
            ) : (
              <div className={styles.create}>
                <img src={profile} alt="profile picture" />
                <input
                  onClick={() => setIsAddPost(true)}
                  type="text"
                  name="new_post"
                  placeholder="Create Post"
                />
              </div>
            )
          ) : null}
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
            {showComments && (
              <div className={styles.commentsPost}>
                <div className={styles.post}>
                  <div
                    onClick={() => setShowComments(false)}
                    className={styles.exitcommends}
                  >
                    <i className="fa-solid fa-xmark"></i>{' '}
                  </div>

                  <div className={styles.source}>
                    <img src={profile} alt="profile picture" />
                    <div className={styles.userpost}>
                      {postComments.post.username}
                    </div>
                    <div className={styles.timeposted}>
                      {timeAgo(new Date(postComments.post.timePosted))}
                    </div>
                  </div>
                  <div className={styles.title}>{postComments.post.title}</div>
                  <div className={styles.content}>
                    {postComments.post.content}
                  </div>
                  <div className={styles.feathers}>
                    <div className={styles.comments}>
                      <form
                        onSubmit={(e) =>
                          addNewComment(
                            e,
                            newComment,
                            postComments.post._id,
                            setShowComments,
                            setPosts
                          )
                        }
                      >
                        <input
                          type="text"
                          placeholder="add comment"
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit">Add</button>
                      </form>
                      {postComments.comments.map((comment, index) => (
                        <div key={index} className={styles.comment}>
                          <div className={styles.userpost}>
                            {comment.username}
                          </div>
                          <div className={styles.contentComment}>
                            {comment.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {posts.map((post, index) => (
              <div key={index} className={styles.post}>
                <div className={styles.source}>
                  <img src={profile} alt="profile picture" />
                  <div className={styles.userpost}>{post.username} - {post.communitySlug}</div>
                  <div className={styles.timeposted}>
                    {timeAgo(new Date(post.timePosted))}
                  </div>
                </div>
                <div className={styles.title}>{post.title}</div>
                <div className={styles.content}>{post.content}</div>
                <div className={styles.feathers}>
                  <div className={styles.comments}>
                    <i className="fa-solid fa-message fa-2xl"></i>
                    <div
                      onClick={() =>
                        openComments(post._id, setPostComments, setShowComments)
                      }
                      className={styles.comments_number}
                    >
                      {post.comments} comments
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.slider}>
          <input
            type="text"
            name="community_filter"
            placeholder="Filter"
          />
          <h6>Your Communities</h6>
          <ul>
            <li onClick={() => navigate(`/c/martialpeak`)} className={styles.community}>
              Martial Peak
            </li>
            <li onClick={() => navigate(`/c/nanomachine`)} className={styles.community}>
              Nano Machine
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
