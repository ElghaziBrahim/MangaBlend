const API_URL = 'http://localhost:3000';

export const handleLogout = async () => {
    console.log('Logging out');

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const result = await response.json();
    console.log(result);

    localStorage.removeItem('token');
    window.location.reload();
};

export const authenticateUser = async (userData, setUserData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/isuserauth`, {
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
            setUserData(result.data);
        } else {
            console.log('User is not logged in');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const addPost = async (post, setPosts) => {
    const data = {
        post,
        token: localStorage.getItem('token'),
    };

    const response = await fetch(`${API_URL}/post/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log(result);

    getPosts(setPosts);
};

export const getPosts = async (setPosts) => {
    const response = await fetch(`${API_URL}/post`);
    const posts = await response.json();
    console.log({ posts });
    setPosts(posts);
};
