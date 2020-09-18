var express = require('express');
var router = express.Router();
var admin_controller=require('../controllers/admin.controller');

/* POST create admin account. */
router.post('/CreateAccount', admin_controller.CreateUserAccount);

/* GET Admin create account */
router.get('/CreateAccount',admin_controller.getCreateAccount);

/*  create customer account. */
router.post('/MakeCustomerAccount', admin_controller.CreateCustomerAccount);

/* GET customer create account */
router.get('/CreateCustomerAccount',admin_controller.getCustomerCreateAccount);

/* Verify Admin login. */
router.post('/verifyAdmin', admin_controller.VerifyLoginAdmin);

/* Get user admin dashboard. */
router.get('/GetAdminDashboard', admin_controller.GetAdminDashboard);

/* Get customer manage. */
router.get('/ManageCustomer',admin_controller.ManageCustomer);

/* Get customer edit page. */
router.get('/EditCustomer/:_id',admin_controller.EditCustomer);

/* Update customer. */
router.post('/EditCustomer/:_id', admin_controller.UpdateEditCustomer);

/* Inactive a customer. */
router.post('/InactiveCustomer/:_id', admin_controller.InactiveCustomer);

/* Get account holder page. */
router.get('/GetAccountHolderForm/:CNIC',admin_controller.GetAccountHolderForm);

/* Create customer holder account. */
router.post('/CreateAccountHolder', admin_controller.CreateAccountHolder);

/* Create customer holder manage. */
router.get('/GetManageAccountHolders',admin_controller.GetManageAccountHolders);

/* Logout user. */
router.get('/Logout', admin_controller.LogoutUser);

/* Get customer by CNIC */
router.get('/GetCustomerByCNIC/:CNIC',admin_controller.GetCustomerByCNIC);

/* Remove Account Holder */
router.get('/DeleteHolderAccount/:_id',admin_controller.DeleteHolderAccount);

module.exports = router;

