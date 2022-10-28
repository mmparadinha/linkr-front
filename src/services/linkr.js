import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_BASE_URL;

function Header() {
    const token = localStorage.getItem('linkr-token');
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    };
    return config;
};

function getUserData(id) {
    const config = Header();
    const promise = axios.get(`${URL_BASE}/user/${id}`, config);
    return promise;
}

function getSearchedUsers(text) {
    const config = Header();
    const promise = axios.get(`${URL_BASE}/search?searchedText=${text}`, config);
    return promise;
}

export { getUserData, getSearchedUsers };