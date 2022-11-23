"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRegisterPage = exports.DisplayRegisterPage = exports.ProcessSignOutPage = exports.ProcessSignInPage = exports.DisplaySignInPage = exports.requireAuth = exports.UserDisplayName = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.displayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/sign-in');
    }
    next();
}
exports.requireAuth = requireAuth;
function DisplaySignInPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'Sign In', page: 'sign-in', messages: req.flash('signInMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/survey-list-all');
}
exports.DisplaySignInPage = DisplaySignInPage;
function ProcessSignInPage(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('signInMessage', 'Username or Password is not correct, or User does not exist');
            return res.redirect('/sign-in');
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            console.log("Sign In Success");
            return res.redirect('/survey-list');
        });
    })(req, res, next);
}
exports.ProcessSignInPage = ProcessSignInPage;
function ProcessSignOutPage(req, res, next) {
    req.logOut();
    res.redirect('/sign-in');
}
exports.ProcessSignOutPage = ProcessSignOutPage;
function DisplayRegisterPage(req, res, next) {
    res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');
            return res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.redirect('/survey-list');
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
//# sourceMappingURL=user.js.map