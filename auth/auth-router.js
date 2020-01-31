const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('../users/usersModel');

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bc.hashSync(req.body.password, 10);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});



router.post('/login', (req, res) => {
  const {username, password} = req.body

  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bc.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      req.session.userId = user.id;

      res.status(200).json({message: `Welcome ${user.username}`});
    } else {
      res.status(401).json({message: 'Invalid Credentials!'})
    }
  })
  .catch(error => {
    res.status(500).json(error);
  })

});

module.exports = router;

