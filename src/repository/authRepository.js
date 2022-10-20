import connection from '../database/database.js';

async function createUser(email, excrypetPassword, username, pictureUrl) {
    return connection.query(`INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);`, [email, excrypetPassword, username, pictureUrl]);
}

async function checkEmail(email) {
    return connection.query("SELECT * FROM users WHERE email=($1) limit 1;", [email]);
}

async function loginUser(verification ,token) {
    return connection.query(
        `INSERT INTO
            sessions ("userId", token)
        VALUES ($1, $2);`,
        [verification.rows[0]?.id, token]
    );
}

export { createUser, checkEmail, loginUser };