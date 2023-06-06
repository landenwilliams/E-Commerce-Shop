const { client } = require("./index.js");
const { createCart } = require("./cart.js");

const createUser = async ({
    username,
    password,
    isAdmin
}) => {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password, "isAdmin")
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `, [username, password, isAdmin])
        await createCart(user.id);
        return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const { rows: users } = await client.query(`
            SELECT *
            FROM users;
        `)
        return users;
    } catch (error) {
        throw error;
    }
}

const getUser = async (username, password) => {
    if (!username || !password) {
        return;
    }
    try {
        const user = await getUserByUsername(username);
        

        if (!user) {
            return;
        } else if (password != user.password) {
            console.log("Password Invalid!")
            return;
        } else {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error;
    }
}

const getUserById = async (userId) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=${userId}`);

        if (!user) {
            return null
        }
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByUsername = async (username) => {
    try {
        const { rows : [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1`, [username]);

    if(!user){
      return null;
    }
    
    return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createUser, 
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername
};