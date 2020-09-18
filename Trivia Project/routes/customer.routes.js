var express = require('express');
var router = express.Router();
var customer_controller=require('../controllers/customer.controller')

/* Verify user login. */
router.post('/verifyLogin', customer_controller.VerifyLogin);

/* Get user profile. */
router.get('/GetUserProfile', customer_controller.GetAccountProfile);

/* Logout user. */
router.get('/Logout', customer_controller.LogoutUser);

/* Edit user profile. */
router.get('/EditUserProfile', customer_controller.EditAccountProfile);

/* POST create user account. */
router.post('/CreateAccount', customer_controller.CreateUserAccount);

/* Select Account for transfer. */
router.get('/SelectAccountToTransferFrom',customer_controller.SelectAccountToTransferFrom);

/* Go to transaction for transfer. */
router.get('/GotoTransaction/:_id',customer_controller.GotoTransaction);

/* Confirm transaction for transfer. */
router.post('/ProceedtoTransaction',customer_controller.ProceedtoTransaction);

/* Do transaction for transfer. */
router.post('/ConfirmTransaction',customer_controller.ConfirmTransaction);

/* Lists transactions. */
router.get('/ListTransactionDetails',customer_controller.ListTransactionDetails);

/* Get total balance */
router.get('/GetMyBalance',customer_controller.GetMyBalance);
module.exports = router;
