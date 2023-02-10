const bcrypt = require('bcryptjs');
const { User } = require('../models');


class UserController {
  static showRegister(req, res) {
    const { errors } = req.query;
    res.render('register', { errors });
  }

  static createUser(req, res) {
    const { email, password, role, fullName, profilePicture } = req.body;

    User.create({ email, password, role })
      .then(() => res.redirect('/'))
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const errors = err.errors.map(({ message }) => {
            return message;
          })
          res.redirect(`/register?errors=${errors}`)
        } else {
          res.send(err);
        }
      });
  }

  static homeLogin(req, res) {
    res.render("login-home")
  }
  static showLogin(req, res) {
    const { error } = req.query;
    res.render('login', { error });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          const error = "The email address you entered isn't connected to an account.";
          return res.redirect(`/login?error=${error}`);
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          const error = "The password that you've entered is incorrect.";
          return res.redirect(`/login?error=${error}`);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        res.redirect(`/home`);
      })
      .catch(err => res.send(err));
  }

}

module.exports = UserController;