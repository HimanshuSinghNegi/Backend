const { sendSuccessMessage, sendErrorMessage } = require('../middlewares/responseHandler.js');
const userModel = require('../models/user');

//method to assign roles to user
const defineRoleId = (roleId) => {
    if (roleId === 0) {
        return 'superadmin';
    } else if (roleId === 1) {
        return 'admin';
    } else {
        return 'user';
    }
};

//addUser
const addUser = async (req, res) => {
    try {
        const userData = req.body;
        if (Object.keys(userData).length === 0) return sendErrorMessage(res, 400, 'request body empty');
        //defining role id
        userData.role = defineRoleId(userData.roleId);
        const user = await userModel.create(userData);
        if (!user) return sendErrorMessage(res, 500, user.message);
        return sendSuccessMessage(res, 200, 'Success', user);
    }
    catch (err) {
        sendErrorMessage(res, 500, err.message);
    }
};

//getUserdetails
const getAdminDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        if (!userId || userId === undefined) return sendErrorMessage(res, 400, 'Please provide user id in Params');
        const user = await userModel.findById({ _id: userId });
        if (user === null) return sendErrorMessage(res, 401, 'User Id Invalid !!!');
        return sendSuccessMessage(res, 200, 'Data get successfully', user);
    }
    catch (err) {
        sendErrorMessage(res, 500, err.message);
    }
};

module.exports = { addUser, getAdminDetail };