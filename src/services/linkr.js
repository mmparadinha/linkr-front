import axios from 'axios';

// const URL_BASE = 'https://back-linkr-projetao.herokuapp.com';
const URL_BASE = 'http://127.0.0.1:4000';

function getUserLinkrs(id) {
    const promise = axios.get(`${URL_BASE}/user/${id}`);
    return promise;
}

function getSearchedUsers() {
    const promise = axios.get(`${URL_BASE}/search`);
    return promise;
}

export { getUserLinkrs, getSearchedUsers };