const passport = require("passport");
const validator = require("validator");
const UserNTW = require("../models/UserNTW");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect(`/userProfile/${req.user.id}`);
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => { 
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    console.log(user)
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      // res.redirect(req.session.returnTo || `/userProfile/${req.user.id}`);
      res.json({authenticated: true, url: `/userProfile/${req.user.id}`})
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.json({loggedOut: true});
  });
};

//New User

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect(`/userProfile/${req.user.id}`);
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  console.log("here")
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    res.json({errors: validationErrors});
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new UserNTW({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });

  UserNTW.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        res.json({errors: err});
      }
      if (existingUser) {
        res.json({errors: "Account with that email address or username already exists."});
      }
      user.save((err) => {
        if (err) {
          res.json({errors: err});
        }
        req.logIn(user, (err) => {
          if (err) {
            res.json({errors: err});
          }
          res.json({ url: `/userProfile/${req.user.id}` });
        });
      });
    }
  );
};
