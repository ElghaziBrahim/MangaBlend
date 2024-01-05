import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import profile from '../../assets/profile.png';
import styles from './community.module.css';
import logo from '../../assets/logo.png';
import Posts from '../Posts/Posts';


import {
    handleLogout,
    authenticateUser,
    timeAgo,
    getPostsByCo,
    openComments,
    addNewComment,
    getCommunityInfoBySlug,
    simplifyDate,
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
                <div className={styles.community_posts}>
                    < Posts userData={userData} community={communityInfo.slug} />
                </div>

                <div className={styles.about_community}>
                    <div className={styles.title}> About Community</div>
                    <p className={styles.about}>
                        {communityInfo.description}
                    </p>
                    <div className={styles.creaded}>
                        <i className="fas fa-cake-candles fa-xl"></i>
                        Created At  {simplifyDate(communityInfo.createdAt)}
                    </div>
                    <hr />
                    <div className={styles.statistics}>
                        <div className={styles.members_number}> {communityInfo.members} members</div>
                    </div>
                </div>
            </div>
        </>
    );
}
