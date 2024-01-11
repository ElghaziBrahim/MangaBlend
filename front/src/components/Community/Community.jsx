import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from './community.module.css';
import Posts from '../Posts/Posts';
import Navbar from "../NavBar/NavBar";


import {
    getCommunityInfoBySlug,
    simplifyDate,
} from '../../functions';

export default function Community() {
    const [userData, setUserData] = useState({});
    const [communityInfo, setCommunityInfo] = useState({});
    const { name } = useParams();
    const navigate = useNavigate();
    function authUser(user) {
        setUserData(user)
    }
    useEffect(() => {
        
        getCommunityInfoBySlug(name, setCommunityInfo);
    }, [name]);

    return (
        <>
            <Navbar authUser={authUser} />


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
