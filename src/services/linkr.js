import axios from 'axios';

const URL_BASE = 'https://back-linkr-projetao.herokuapp.com';

function getUserLinkrs(id) {
    const promise = axios.get(`${URL_BASE}/user/${id}`);
    return promise;
}

function getUsers(body) {
    const promise = axios.get(`${URL_BASE}/users`, '', body);
    return promise;
}

export { getUserLinkrs, getUsers };