//Imports
const express = require('express')
const { restrict } = require('../auth/auth-middleware')
const User = require('./users-model')


//Miniature Instance Of Express Server
const router = express.Router()


//Endpoints
/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */
router.get('/', restrict, async (req, res, next) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
      // User.find()
      //   .then(users => {
      //     res.status(200).json(users);
      //   })
      //   .catch(next);
})


//Exports; Exposing
module.exports = router;