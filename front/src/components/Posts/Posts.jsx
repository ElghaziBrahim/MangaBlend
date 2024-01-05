// Posts.js
import React, { useState, useEffect } from 'react';
import styles from './posts.module.css';
import {
    addPost,
    getPosts,
    timeAgo,
    openComments,
    addNewComment,
    getPostsByCo,
} from '../../functions';
import profile from '../../assets/profile.png';

const Posts = ({ userData, community }) => {
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [newComment, setNewComment] = useState('');


    const [isAddPost, setIsAddPost] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    function getdata_posts() {
        if (community != "public") {
            getPostsByCo(setPosts, community)
        } else {
            getPosts(setPosts);
        }
    }
    useEffect(() => {
        getdata_posts()
    }, [community]);

    const handleNewPost = (e) => {
        e.preventDefault();
        setIsAddPost(false);


        const post = {
            title: postTitle,
            content: postContent,
            community: community
        };

        setPostContent('');
        setPostTitle('');
        addPost(post, getdata_posts);
    };

    return (
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
                                                getdata_posts
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
    );
};

export default Posts;
