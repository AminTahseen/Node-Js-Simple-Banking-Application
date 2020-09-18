const Models = require('../Models/models');
const AdminModel = Models.Admin;
const CustomerModel = Models.Customer;
const AccountHolderModel = Models.AccountHolder;

exports.CreateUserAccount = function (req, res) {
    const newEntry = req.body;
    AdminModel.create(newEntry, (e, newEntry) => {
        if (e) {
            console.log(e);
            res.render('createAdminAccount', { title: 'Create Account', message: 'Account Creating Error Occured' });
        } else {
            res.render('createAdminAccount', { title: 'Create Account', message: 'Account Successfully Created' });
        }
    });
};

exports.getCreateAccount = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        res.render('createAdminAccount', { title: 'Create Account', message: '' });
    }
};

exports.getCustomerCreateAccount = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        res.render('createCustomerAccount', { title: 'Create Customer Account', message: '' });
    }
};


exports.CreateCustomerAccount = function (req, res) {
    if (req.session.Admin != null) {
        const newEntry = req.body;
        if (req.body.Customer_CNIC === req.session.Admin.Admin_CNIC) {
            res.render('createCustomerAccount', { title: 'Create Customer Account', message: 'Cannot Create Custommer Account For Admin' });
            console.log("ADMIN CNIC : " + req.session.Admin.Admin_CNIC)
            console.log("Customer CNIC : " + req.body.Customer_CNIC)
        }
        else {

            CustomerModel.create(newEntry, (e, newEntry) => {
                if (e) {
                    console.log(e);
                    res.render('createCustomerAccount', { title: 'Create Customer Account', message: 'Account Creating Error Occured' });
                } else {
                    console.log("Customer Account Created");
                    res.render('createCustomerAccount', { title: 'Create Customer Account', message: 'Customer Account Successfully Created' });
                }
            });
        }
    }
    else {
        res.redirect('/');
    }

};

exports.VerifyLoginAdmin = function (req, res) {
    const { Admin_CNIC, Admin_password } = req.body;
    try {
        AdminModel.findOne({ Admin_CNIC: Admin_CNIC, Admin_password: Admin_password }, (err, user) => {
            if (user === null) {
                res.render('LoginAdmin', { title: 'login', message: 'Login Failed' });
            }
            else if (user.Admin_CNIC === Admin_CNIC && user.Admin_password === Admin_password) {
                var user = user;
                req.session.Admin = user;
                res.locals.Admin = user;
                res.render('AdminDashboard', { title: 'Admin Dashboard', profileData: req.session });
                console.log("Creating session for: " + req.session.Admin.Admin_name);
            }
            else {
                res.render('LoginAdmin', { title: 'login', message: 'Error occured' });
            }
        });
    }
    catch (err) {
        res.send(err)
    }
};

exports.GetAdminDashboard = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        res.render('AdminDashboard', { title: 'Admin Dashboard' });
    }
};

exports.LogoutUser = function (req, res) {
    req.session.destroy((err) => {//destroy all sessions
        if (err) {
            return console.log(err);
        } else {
            console.log('Destroying session');
        }
        res.redirect('/AdminLogin');
    });
};

exports.ManageCustomer = function (req, res) {
    let query = res.locals.query || {};

    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        CustomerModel.find(query, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.render('ManageCustomers', { title: 'Manage Customers', data: result });
            }
        });
    }
};

exports.EditCustomer = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        const { _id } = req.params;
        CustomerModel.findById(_id, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.render('EditCustomerPage', { title: 'Edit Customer', data: result });
            }
        });
    }

};

exports.UpdateEditCustomer = function (req, res) {
    const changedEntry = req.body;
    CustomerModel.update({ _id: req.params._id }, { $set: changedEntry }, (e) => {
        if (e)
            res.sendStatus(500);
        else
            res.redirect('/admin/ManageCustomer');
    });
};

exports.InactiveCustomer = function (req, res) {
    CustomerModel.update({ _id: req.params._id }, { $set: { "Customer_status": "Inactive" } }, (e) => {
        if (e)
            res.sendStatus(500);
        else
            res.redirect('/admin/ManageCustomer');
    });
};


//Account Holders
exports.GetManageAccountHolders = function (req, res) {
    let query = res.locals.query || {};
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        AccountHolderModel.find(query, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.render('ManageAccountHolders', { title: 'Manage Account Holders', data: result });
            }
        });
    }
};

exports.GetAccountHolderForm = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        res.render('AccountHolderForm', { title: 'Account Holder', data: req.params.CNIC, message: '' });
    }
};

exports.CreateAccountHolder = function (req, res) {
    const newEntry = req.body;
    AccountHolderModel.create(newEntry, (e, newEntry) => {
        if (e) {
            console.log(e);
            res.render('AccountHolderForm', { title: 'Account Holder', data: req.params.CNIC, message: 'Account Creating Error Occured' });
        } else {
            res.redirect('/admin/GetManageAccountHolders');
        }
    });
};

exports.GetCustomerByCNIC = function (req, res) {
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        CustomerModel.findOne({ 'Customer_CNIC': req.params.CNIC }, function (err, Customer) {
            if (err) {
                res.send(err);
            }
            if (CustomerModel === null) {
                res.redirect('/admin/GetManageAccountHolders');
            }
            else {
                res.render('showCustomerDetails', { title: 'Show Customer Details', data: Customer });
            }
        });
    }
};

exports.DeleteHolderAccount = function(req,res){
    if (req.session.Admin == null) {
        res.redirect('/');
    } else {
        AccountHolderModel.remove({ _id: req.params._id }, (e) => {
            if (e)
            res.status(500).send(e);
            else
            res.redirect('/admin/GetManageAccountHolders');
        });
    }
};