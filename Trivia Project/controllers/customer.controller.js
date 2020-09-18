const Models = require('../Models/models');
const CustomerModel = Models.Customer;
const AccountHolderModel = Models.AccountHolder;
const TransactionModel = Models.Transactions;

exports.VerifyLogin = function (req, res) {
  const { Customer_CNIC, Customer_password } = req.body;
  try {
    CustomerModel.findOne({ Customer_CNIC: Customer_CNIC, Customer_password: Customer_password }, (err, user) => {
      if (user === null) {
        res.render('login', { title: 'login', message: 'Login Failed' });
      }
      else if (user.Customer_CNIC === Customer_CNIC && user.Customer_password === Customer_password) {
        if (user.Customer_status == "Active") {
          var user = user;
          req.session.Customer = user;
          res.locals.Customer = user;
          res.render('AccountProfile', { title: 'Account Profile', profileData: req.session });
          console.log("Creating session for: " + req.session.Customer.Customer_name);
        }
        else {
          res.render('login', { title: 'login', message: 'Login Failed, Account status Inactive.' });
        }

      }
      else {
        res.render('login', { title: 'login', message: 'Error occured' });
      }
    });
  } catch (err) {
    res.send(err)
  }
};

exports.GetAccountProfile = function (req, res) {
  if (req.session.Customer == null) {
    res.redirect('/');
  } else {
    res.render('AccountProfile', { title: 'Account Profile', profileData: req.session });
  }
};

exports.LogoutUser = function (req, res) {
  req.session.destroy((err) => {//destroy all sessions
    if (err) {
      return console.log(err);
    } else {
      console.log('Destroying session');
    }
    res.redirect('/login');
  });
};

exports.EditAccountProfile = function (req, res) {
  if (req.session.Customer == null) {
    res.redirect('/');
  } else {
    res.render('AccountProfile', { title: 'Account Profile' });
  }
};

exports.CreateUserAccount = function (req, res) {
  const newEntry = req.body;
  UserModel.create(newEntry, (e, newEntry) => {
    if (e) {
      console.log(e);
      res.render('createAccount', { title: 'Create Account', message: 'Account Creating Error Occured' });
    } else {
      res.render('createAccount', { title: 'Create Account', message: 'Account Successfully Created' });
    }
  });
};

exports.SelectAccountToTransferFrom = function (req, res) {
  if (req.session.Customer == null) {
    res.redirect('/');
  }
  else {
    AccountHolderModel.find({ 'Holder_CNIC': req.session.Customer.Customer_CNIC }, function (err, records) {
      if (err) {
        res.send(err);
      }
      if (records === null) {
        res.render('SelectAccountToTransfer', { title: 'Select Account', data: '', message: '' });
      }
      else {
        res.render('SelectAccountToTransfer', { title: 'Select Account', data: records, message: '' });
      }
    });
  }
};

exports.GotoTransaction = function (req, res) {
  if (req.session.Customer == null) {
    res.redirect('/');
  } else {
    const { _id } = req.params;
    AccountHolderModel.findById(_id, (e, result) => {
      if (e) {
        console.log(e.message);
      } else {
        res.render('GotoTransactBalance', { title: 'Transact Balance', data: result,message: '' });
      }
    });
  }
};

exports.ProceedtoTransaction = function (req, res) {
  const newEntry = req.body;
  if (req.session.Customer == null) {
    res.redirect('/');
  }
  else {
    console.log("Session for transaction : " + newEntry.From_Whom_card_no);
    if(req.body.Transaction_Amount > req.body.Sender_card_amount)
    {
      res.render('GotoTransactBalance', { title: 'Transact Balance', message: 'Transaction Amount is too much' });
    }else
    {
      res.render('ConfirmTransactBalance', { title: 'Confirm Transaction', data: newEntry, message: '' });
    }
  }
};

exports.ConfirmTransaction = function (req, res) {
  if (req.session.Customer == null) {
    res.redirect('/');
  }
  else {
      let Transact = new TransactionModel({
        Transaction_ID: req.session.Customer.Customer_name + req.session.Customer.Customer_CNIC,
        Customer_CNIC: req.body.Customer_CNIC,
        From_Whom_card_no: req.body.From_Whom_card_no,
        To_Whom_card_no: req.body.To_Whom_card_no,
        Sender_card_amount: req.body.Sender_card_amount,
        Transaction_Amount: req.body.Transaction_Amount,
        Transaction_Date: Date.now(),
      })
  
      Transact.save(function (err) {
        if (err) {
          res.render('ConfirmTransactBalance', { title: 'Confirm Transaction', data: newEntry, message: 'Transaction Failed' });
        }
        res.render('ConfirmTransactBalance', { title: 'Confirm Transaction', data: '', message: 'Transaction Successful' });
      })
  }
};

exports.ListTransactionDetails=function(req, res){
  if (req.session.Customer == null) {
    res.redirect('/');
  }
  else {
    TransactionModel.find({'Customer_CNIC': req.session.Customer.Customer_CNIC }, function(err, CR)
    {
        if(err){
            res.send(err);
        }
        if(CR===null)
        {
          res.render('ListTransactionDetails', { title: 'Transaction Details', data: '' });
        }
        else{
          res.render('ListTransactionDetails', { title: 'Transaction Details', data: CR });
        }
    });

  }
};


exports.GetMyBalance = function (req, res) {
  
  var TOTAL=0;
  if (req.session.Customer == null) {
    res.redirect('/');
  }
  else {
    AccountHolderModel.find({ 'Holder_CNIC': req.session.Customer.Customer_CNIC }, function (err, records) {
      if (err) {
        res.send(err);
      }
      if (records === null) {
        res.render('GetMyBalance', { title: 'Get My Balance', balance: 0 });
      }
      else {
        records.forEach(elem=>{
          TOTAL+=elem.Account_Balance;
        });
        console.log("TOTAL VAL OUTSIDE: "+TOTAL);
        res.render('GetMyBalance', { title: 'Get My Balance', balance: TOTAL });

      }
    });
  }
};