const express = require('express');
const router = express.Router();

const User = require('../models/user');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});


var upload = multer({ storage: storage }).single('image');


//home route with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;              // rows per page
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalUsers / limit);

    res.render('index', {
      title: 'Home Page',
      users,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});



//add user route
router.get('/add', (req, res) => {
    res.render('add_user',{title: 'Add User'});
});


//post add user route
router.post('/adduser', upload, async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const image = req.file ? req.file.filename : null;

    await User.create({ username, email, phone, image });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding user: ' + error.message);
  }
});


//edit user route
router.get('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.render('edituser', {
            title: 'Edit User',
            user
        });
    } catch (error) {
        res.status(500).send('Error fetching user: ' + error.message);
    }
});

router.post('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, phone } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        await User.findByIdAndUpdate(userId, { username, email, phone, image });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
});

//delete user route
router.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
});

module.exports = router;