// Import necessary modules
var express = require("express");
var router = express.Router();

const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");

const userModel = require("./users");
const postModel = require("./post");

/* Configure passport to use local strategy for authentication*/
passport.use(new localStrategy(userModel.authenticate()));

/* Middleware function to check if user is authenticated*/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

/* Route for rendering the home page*/
router.get("/", function (req, res, next) {
  res.render("index", {nav: false} );
});

/* Route for rendering the register page */
router.get("/register", function (req, res, next) {
  res.render("register", {nav: false});
});

// Route for handling registration form submission
router.post("/register", function (req, res, next) {
  // Create a new user data object
  var data = new userModel({
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    name: req.body.fullname,
  });

  // Register the user using passport-local-mongoose's register method
  userModel
    .register(data, req.body.password)
    .then(function () {
      // Authenticate the user after registration and redirect to profile page
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (error) {
      // Handle registration error
      console.error("Registration error:", error);
      res.redirect("/register");
    });
});

/* Route for rendering the profile page, accessible only if user is authenticated */
router.get("/profile", isLoggedIn, async function (req, res) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user }).populate('posts');
    res.render("profile", { user, nav: true });    
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/feed', isLoggedIn, async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user});
  const posts = await postModel.find().populate('user');
  res.render('feed', {user, posts, nav: true});
});

router.get('/add', isLoggedIn, async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render('add', {user, nav: true});
});


router.post("/createpost", isLoggedIn,upload.single("pinImage"), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user: user._id,
    title: req.body.pinTitle,
    description: req.body.pinDescription,
    image: req.file.filename,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');
});

/* Route for handling login form submission */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
    failureFlash: true,
  })
);


router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    try {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      if (!user) {
        throw new Error("User not found");
      }
      user.profile_picture = req.file.filename;
      await user.save();
      res.redirect("/profile");
    } catch (error) {
      console.error("Error uploading file:", error);
      res.redirect("/profile");
    }
  }
);

router.get('/post/:id', isLoggedIn, async function(req, res){
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.findById(req.params.id).populate('user');
  res.render('post', {user, post, nav: true});
});



/* Route for handling logout */
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Export the router module
module.exports = router;
