import styles from './navBar.module.css';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



import {
    handleLogout,
    authenticateUser,
} from '../../functions';


export default function Navbar({ authUser }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        authenticateUser(userData, setUserData);
    }, []);
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            navigate(`/search/?v=${searchVal}`)
        }
    }
    useEffect(() => {
        if (userData.username) authUser(userData)
    }, [userData]);
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/">
                    <img src={logo} alt="MangaBlend" width="50px" />
                </Link>

            </div>

            <input
                type="text"
                onKeyDown={handleKeyDown}
                name="search"
                placeholder="Search Something"
                onChange={(e) => setSearchVal(e.target.value)}
                value={searchVal}
            />

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
    )
}