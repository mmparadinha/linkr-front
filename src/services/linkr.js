import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_BASE_URL;

function getUserLinkrs(id) {
    const promise = axios.get(`${URL_BASE}/user/${id}`);
    return promise;
}

function getSearchedUsers() {
    const promise = axios.get(`${URL_BASE}/search`);
    return promise;
}

export { getUserLinkrs, getSearchedUsers };