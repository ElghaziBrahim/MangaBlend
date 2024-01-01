
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import profile from '../../assets/profile.png';
import styles from './community.module.css';
import logo from '../../assets/logo.png';

import {
    handleLogout,
    authenticateUser,
    timeAgo,
    getPostsByCo,
} from '../../functions';


export default function Community() {
    const [userData, setUserData] = useState([]);

    const [posts, setPosts] = useState([])
    const { name } = useParams();

    useEffect(() => {
        console.log(`Martial Peak ID from useEffect: ${name}`);
        authenticateUser(userData, setUserData);
        getPostsByCo(setPosts, name);
    }, [name]);
    return (
        <>
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
            <div className={styles.backcolor}></div>
            <div className={styles.header}>
                <div className={styles.contentheader}>
                    <img src={`/src/assets/${name}.png`} />
                    <div className={styles.communityname}>{name}</div>
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
        </>
    )
}