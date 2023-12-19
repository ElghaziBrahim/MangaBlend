export const hundlelogOut = async () => {
    console.log("log out")
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    console.log(result)
    localStorage.removeItem('token');

    window.location.reload();

}
export const AuthUser = async (userData, setUserData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/isuserauth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.access) {
            console.log('User logged in');
            setUserData(result.data)
        } else {
            console.log('User is not logged in');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export const addPost = async (post, setPosts) => {
    const data = {
        post,
        token: localStorage.getItem('token')
    }
    const response = await fetch('http://localhost:3000/post/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json()
    console.log(result)
    getPosts(setPosts)
}
export const getPosts = async (setPosts) => {
    const response = await fetch("http://localhost:3000/post")
    const posts = await response.json()
    console.log({ posts })
    setPosts(posts)
}
