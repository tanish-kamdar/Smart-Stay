const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const port=8080;
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js');
const reviews=require('./routes/reviews.js');
const listings=require('./routes/listings.js');
const user=require('./routes/user.js');

const listingController=require('./controllers/listings.js');

const multer=require('multer');
const upload=multer({dest : 'uploads/'});

require('dotenv').config();

const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');

const store=MongoStore.create({
    
    mongoUrl : process.env.ATLASDB_URL,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600
});

sessionOptions={
    store : store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookies : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongoURL=process.env.ATLASDB_URL;

async function main(){
     await mongoose.connect(mongoURL);
     console.log('Database Connection established');
}
main().catch(err=>console.log(err));


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.failure=req.flash('failure');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
});


app.get('/',listingController.index);

//Listings
app.use('/listings',listings);


//Reviews
app.use('/listings/:id/reviews',reviews);

//User
app.use('/user',user);

app.all('*',(req,res,next)=>{
    throw new ExpressError(404,'Page Does\'t Exist');
});

app.use((err,req,res,next)=>{
    let {status=500 , message="Something Went Wrong!"}=err;
    res.status(status).render('error.ejs',{err,status});
    console.log(err.stack);
});

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});