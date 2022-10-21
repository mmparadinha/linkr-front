import axios from 'axios';

const URL_BASE = 'https://back-linkr-projetao.herokuapp.com';

function getUserLinkrs(id) {
    const promise = axios.get(`${URL_BASE}/user/${id}`);
    return promise;
}

function getSearchedUsers(body) {
    const promise = axios.get(`${URL_BASE}/search`, '', body);
    return promise;
}

export { getUserLinkrs, getSearchedUsers };