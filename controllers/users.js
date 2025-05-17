const User=require('../models/user.js');

module.exports.getSignupForm=(req,res)=>{
    res.render('user/signup.ejs');
};

module.exports.addUser=async (req,res)=>{
    try{
    let newUser=new User(req.body);
    await User.register(newUser,req.body.password);
    req.login(newUser,(err)=>{
        if(err) next(err);

    req.flash('success',`Welcome to SmartStay, ${req.body.username}`);
    res.redirect('/listings');
    });
    
    }catch(e){
    req.flash('failure',`The user already exists.`);
    res.redirect('/user/signup');
    }
}

module.exports.getLoginForm=(req,res)=>{
    res.render('user/login.ejs');
}

module.exports.login=async (req,res)=>{
    req.flash('success',`Welcome to SmartStay, ${req.body.username}`);
    let redirectUrl=res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);

        req.flash('success','You are successfully logged out.');
        res.redirect('/listings');
    });
}