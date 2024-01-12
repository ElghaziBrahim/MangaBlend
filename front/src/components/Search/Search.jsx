
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Posts from '../Posts/Posts';
import styles from "./search.module.css"
import profile from '../../assets/profile.png';


import {
    getCommunitiesBySearch,
    getUsersBySearch
} from '../../functions';


export default function Search() {
    const [userData, setUserData] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const [filter, setFilter] = useState("communities")

    const [searchVal, setSearchVal] = useState("")
    const [communities, setCommunities] = useState([])
    const [users, setUsers] = useState([])



    function authUser(user) {
        setUserData(user)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const q = queryParams.get('v');
        setSearchVal(q);
        if (filter == "communities") { getCommunitiesBySearch(q, setCommunities) }
        if (filter == "people") { getUsersBySearch(q, setUsers) }


    }, [location.search, filter])
    useEffect(() => {
        if(filter == "posts") { setFilter("communities") }
    }, [location.search])

    return (
        <>
            <Navbar authUser={authUser} />
            <div className={styles.container}>
                <div className={styles.searchFilters}>
                    <div onClick={() => setFilter("posts")} className={`${styles.searchFilter} ${filter === "posts" ? styles.filterOn : ""}`}>
                        Posts
                    </div>
                    <div onClick={() => setFilter("communities")} className={`${styles.searchFilter} ${filter === "communities" ? styles.filterOn : ""}`}>
                        Communities
                    </div>
                    <div onClick={() => setFilter("people")} className={`${styles.searchFilter} ${filter === "people" ? styles.filterOn : ""}`}>
                        People
                    </div>
                </div>
                {
                    (filter == "posts") ? (
                        <Posts userData={userData} community="public" isFilter={{ is: true, filter: searchVal }} />
                    ) : (filter == "communities") ? (
                        <div className={styles.communities}>
                            {
                                communities.map((c) => (
                                    <div className={styles.community} onClick={() => { navigate(`/c/${c.slug}`) }}>
                                        <div className={styles.left}>
                                            <img src={`/${c.slug}_wide.png`} alt={`${c.name} logo`} />
                                        </div>
                                        <div className={styles.right}>
                                            <div className={styles.com_name}>
                                                <h4> {c.name}</h4>
                                                <h5>{c.members} members</h5>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                    ) : (
                        <div className={styles.people}>
                            {
                                users.map((u) =>
                                (
                                    <div className={styles.user}>
                                        <img src={profile} alt="" />
                                        <div className={styles.username}>
                                            {u.username}
                                        </div>
                                    </div>
                                )

                                )
                            }
                        </div>
                    )
                }
            </div >
        </>
    )
}