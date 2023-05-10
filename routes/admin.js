const express = require('express');
const router = express.Router();

const admin = require('../controllers/adminController');
const ajvValidatorDto = require('../middlewares/ajvValidatorDto.js');
const CustomerError = require('../helper/customeError');
const errorHandler = require('../middlewares/errorHandler.js');
const tokenSchema = require('../validators/authValidator/autoLogInSchema.js');
const userSchema = require('../validators/userValidator/userSchema');

//routes
router.post('/addUser', ajvValidatorDto.ajvBodyValidatorDto(userSchema), admin.addUser);
router.get('/getAdminDetail/:id', ajvValidatorDto.ajvHeaderValidatorDto(tokenSchema), admin.getAdminDetail);

//invalid route handler
router.all('*', (req, res, next) => {
    const err = new CustomerError(400, `Requested URL ${req.url} not found !!`);
    next(err);
});

//middleware to handle invalid endpoints
router.use(errorHandler);

module.exports = router;