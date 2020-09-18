exports.getIndex=function(req,res)
{
    res.render('index', { title: 'Home' });
};

exports.getAboutUs=function(req,res)
{
    res.render('AboutUs', { title: 'About Us' });
};
exports.getContactUs=function(req,res)
{
    res.render('ContactUs', { title: 'Contact Us' });
};
exports.getLogin=function(req,res)
{
    res.render('Login', { title: 'Login',message: '' });
};

exports.getAdminLogin=function(req,res)
{
    res.render('LoginAdmin', { title: 'Admin Login',message: '' });
};

