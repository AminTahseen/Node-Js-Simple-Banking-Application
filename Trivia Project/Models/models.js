//models.js
const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://amin:amin12345@cluster0-8kacx.mongodb.net/TriviaDB?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// =======
// Schemas
// =======

// Customer table
const CustomerSchema = new Schema({
  Customer_name: String,
  Customer_CNIC: String,
  Customer_From: String,
  Customer_password: String,
  Customer_status: String,
},
{ strict: false }
);

// Administrator table
const AdminSchema = new Schema({
  Admin_name: String,
  Admin_CNIC: String,
  Admin_password: String,
},
{ strict: false }
);

// Account Holder table
const AccountHolderSchema = new Schema({
  Account_HolderID: String,
  Holder_CNIC: String,
  Account_Description: String,
  Account_Balance: Number,
},
{ strict: false }
);

// Transactions table
const TransactionSchema = new Schema({
  Transaction_ID: String,
  Customer_CNIC: String,
  From_Whom_card_no: String,
  To_Whom_card_no: String,
  Sender_card_amount: Number,
  Transaction_Amount: Number,
  Transaction_Date: Date,
},
{ strict: false }
);

const models = {};
models.Customer= mongoose.model('Customers',CustomerSchema);
models.Admin= mongoose.model('Admins',AdminSchema);
models.AccountHolder= mongoose.model('Accounts_Holder',AccountHolderSchema);
models.Transactions=mongoose.model('Transactions',TransactionSchema);


module.exports = models;