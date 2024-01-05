import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import profile from '../../assets/profile.png';
import styles from './community.module.css';
import logo from '../../assets/logo.png';


import {
    handleLogout,
    authenticateUser,
    timeAgo,
    getPostsByCo,
    openComments,
    addNewComment,
    getCommunityInfoBySlug,
} from '../../functions';

export default function Community() {
    const [userData, setUserData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [postComments, setPostComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [communityInfo, setCommunityInfo] = useState({});
    const { name } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        console.log(`Community ID from useEffect: ${name}`);
        authenticateUser(userData, setUserData);
        getPostsByCo(setPosts, name);
        getCommunityInfoBySlug(name, setCommunityInfo)
    }, [name]);

    const handleOpenComments = (postId) => {
        openComments(postId, setPostComments, setShowComments);
    };

    const handleAddComment = (e, postId) => {
        e.preventDefault();
        addNewComment(e, newComment, postId, setShowComments, setPosts);
        setNewComment('');
    };

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.left}>
                    <img src={logo} alt="MangaBlend" width="50px" onClick={() => navigate('/')} />
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
            {/* <div className={styles.backcolor}></div> */}
            <div className={styles.header}>
                <div className={styles.contentheader}>
                    <img src={`/src/assets/${name}_wide.png`} alt={`${name} logo`} />
                    <div className={styles.communityname}>{communityInfo.name}</div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.posts}>
                    {posts.map((post, index) => (
                        <div key={index} className={styles.post}>
                            <div className={styles.source}>
                                <img src={profile} alt="profile picture" />
                                <div className={styles.userpost}>{post.username}</div>
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
                                        onClick={() => handleOpenComments(post._id)}
                                        className={styles.comments_number}
                                    >
                                        {post.comments} comments
                                    </div>
                                </div>
                                {showComments && (
                                    <div className={styles.commentsPost}>
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
                                        <div className={styles.title}>
                                            {postComments.post.title}
                                        </div>
                                        <div className={styles.content}>
                                            {postComments.post.content}
                                        </div>
                                        <div className={styles.feathers}>
                                            <div className={styles.comments}>
                                                <form
                                                    onSubmit={(e) =>
                                                        handleAddComment(
                                                            e,
                                                            postComments.post._id
                                                        )
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="add comment"
                                                        onChange={(e) =>
                                                            setNewComment(e.target.value)
                                                        }
                                                        value={newComment}
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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.about_community}>
                    <div className={styles.title}> About Community</div>
                    <p className={styles.about}>
                        Welcome to Full-Stack Development! Feel free to ask questions or discuss all aspects of full stack development, or development life in general. If you’re asking a question, try to give only as much detail as necessary. ***Please do not post job postings here or content related to hiring. It will be removed
                    </p>
                    <div className={styles.creaded}>
                        <i className="fas fa-cake-candles fa-xl"></i>
                        Created At 26 sep 2023
                    </div>
                    <hr />
                    <div className={styles.statistics}>
                        <div className={styles.members_number}> 20 Members</div>
                    </div>
                </div>
            </div>
        </>
    );
}
