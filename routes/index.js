const express = require('express');
const Controller = require('../controllers');
const UserController = require('../controllers/UserController');
// const userRouter = require('./user');
const router = express.Router()

router.get('/register', UserController.showRegister);
router.post('/register', UserController.createUser);

router.get('/login', UserController.showLogin);
router.post('/login', UserController.login);
// router.get('/logout', UserController.logout);

router.get('/', Controller.redirect)
router.get('/home', Controller.home)
router.use((req, res, next)=>{
    if(!req.session.email){
        const error = 'You have no access. Login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})
router.get('/orders', Controller.showOrder)
router.get('/orders', Controller.showOrder)

router.get('/orders/add', Controller.addOrder)
router.post('/orders/add', Controller.createOrder)

router.get('/laundries', Controller.showLaundry)
router.get('/laundries/add', Controller.addLaundry)
router.post('/laundries/add', Controller.createLaundry)

router.get('/laundries/edit/:id', Controller.editLaundry)
router.post('/laundries/edit/:id', Controller.updateLaundry)

router.get('/logout', Controller.logout)

router.get('/laundries/delete/:id', Controller.destroyLaundry)

module.exports = router