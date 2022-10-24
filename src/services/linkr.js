import axios from 'axios';

const URL_BASE = 'https://back-linkr-projetao.herokuapp.com';

function getUserLinkrs(id) {
    const promise = axios.get(`${URL_BASE}/user/${id}`);
    return promise;
}

function getSearchedUsers() {
    const promise = axios.get(`${URL_BASE}/search`);
    return promise;
}

export { getUserLinkrs, getSearchedUsers };