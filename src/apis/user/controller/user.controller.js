const APIResponseFormat = require('../../../utils/APIResponseFormat.js');
const UserService = require('../service/user.service.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return APIResponseFormat._ResSuccess(res, "User fetched successfully!!!", users);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const addUser = async (req, res) => {
    try {
        const createdUser = await UserService.addUser(req.body);
        return APIResponseFormat._ResCreated(res, "User created successfully!!!", createdUser);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserService.updateUser(req.params.id, req.body);
        return APIResponseFormat._ResSuccess(res, "User updated successfully!!!", updatedUser);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserService.deleteUser(req.params.id);
        return APIResponseFormat._ResSuccess(res, "User deleted successfully!!!", deletedUser);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}