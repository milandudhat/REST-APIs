const db = require("../../../database/models");
const User = db.user;

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        throw error;
    }
}

const addUser = async (user) => {
    try {
        const createdUser = await User.create(user);
        return createdUser
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, user) => {
    try {
        const updatedUser = await User.update(user, {
            where: {
                id: id
            }
        });
        return updatedUser
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: id
            }
        });
        return deletedUser
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}