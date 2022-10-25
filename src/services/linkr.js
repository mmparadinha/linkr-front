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

function getUserLinkrs(id) {
    const config = Header();
    const promise = axios.get(`${URL_BASE}/user/${id}`, config);
    return promise;
}

function getSearchedUsers() {
    const config = Header();
    const promise = axios.get(`${URL_BASE}/search`, config);
    return promise;
}

export { getUserLinkrs, getSearchedUsers };