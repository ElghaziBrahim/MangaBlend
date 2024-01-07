import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import styles from './community.module.css';
import logo from '../../assets/logo.png';
import Posts from '../Posts/Posts';

import {
    handleLogout,
    authenticateUser,
    getCommunityInfoBySlug,
    simplifyDate,
} from '../../functions';

export default function Community() {
    const [userData, setUserData] = useState({});
    const [communityInfo, setCommunityInfo] = useState({});
    const { name } = useParams();
    const navigate = useNavigate();

    // Fetch user data and community information when the component mounts or when the community name changes
    useEffect(() => {
        console.log(`Community ID from useEffect: ${name}`);
        authenticateUser(userData, setUserData);
        getCommunityInfoBySlug(name, setCommunityInfo);
    }, [name]);

    return (
        <>
            {/* Navbar */}
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

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.contentheader}>
                    <img src={`/${name}_wide.png`} alt={`${name} logo`} />
                    <div className={styles.communityname}>{communityInfo.name}</div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.container}>
                {/* Community Posts */}
                <div className={styles.community_posts}>
                    <Posts userData={userData} community={communityInfo.slug} />
                </div>

                {/* About Community */}
                <div className={styles.about_community}>
                    <div className={styles.title}> About Community</div>
                    <p className={styles.about}>
                        {communityInfo.description}
                    </p>
                    <div className={styles.creaded}>
                        <i className="fas fa-cake-candles fa-xl"></i>
                        Created At {simplifyDate(communityInfo.createdAt)}
                    </div>
                    <hr />
                    <div className={styles.statistics}>
                        <div className={styles.members_number}>{communityInfo.members} members</div>
                    </div>
                </div>
            </div>
        </>
    );
}
