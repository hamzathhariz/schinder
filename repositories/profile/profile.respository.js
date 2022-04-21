const { User, validateUser, validateUserLogin } = require('../../models/user');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');

exports.userSignUp =asyncMiddleware(async (req, res, next) => {
    const { error } = validateUser(req.body);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    var user = await User.findOne({ phone: req.body.phone });

    if(user) {
        let response = Response('error', 'phone number already registered');
        return res.status(response.statusCode).send(response);
    }

    // Creating empty user object 
    let newUser = new User(); 

    // Initialize newUser object with request data 
    newUser.name = req.body.name; 

    newUser.email = req.body.email;

    newUser.isAdmin = req.body.isAdmin;

    newUser.phone = req.body.phone;

    newUser.phone = req.body.phone;

    newUser.phone = req.body.phone;

    newUser.password=req.body.password;

    // Call setPassword function to hash password 
    newUser.setPassword(req.body.password); 

    // Save newUser object to database 
    await newUser.save((err, User) => { 
        if (err) { 
            let response = Response('error', 'user is not created');
            return res.status(response.statusCode).send(response); 
        } 
        else { 
            let response = Response('success', 'user added');
            return res.send(response);
        } 
    }); 
}); 


exports.userLogin = asyncMiddleware(async (req, res, next) => {
    const { error } = validateUserLogin(req.body);

    if(error) {
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    // Admin Login
    if(req.body.isAdmin === true) {
        var user = await User.findOne({ phone : req.body.phone, isAdmin: true });

        if (user === null) { 
            let response = Response('error', 'user not found');
            return res.status(response.statusCode).send(response);
        } 
        else { 
            if (user.validPassword(req.body.password)) { 
                let response = Response('success', 'login');
                return res.send(response); 
            } 
            else { 
                let response = Response('error', 'incorrect password');
                return res.status(response.statusCode).send(response); 
            } 
        } 
    }

    // User Login 
    var user = await User.findOne({ phone : req.body.phone });

    if (user === null) { 
        let response = Response('error', 'user not found');
        return res.status(response.statusCode).send(response); 
    } 
    else { 
        if(user.isAdmin) {
            let response = Response('error', 'user not found');
            return res.status(response.statusCode).send(response);
        }

        else if (user.validPassword(req.body.password)) { 
            let response = Response('success', 'login');
            return res.send(response);
        } 
        
        else { 
            let response = Response('error', 'incorrect password');
            return res.status(response.statusCode).send(response); 
        } 
    } 
});

