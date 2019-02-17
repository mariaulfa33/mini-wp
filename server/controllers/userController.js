const User = require('../models/user')
const compareHash = require('../helpers/compareHash')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')


class UserController {

  static create(req, res) {
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      type : 'manual'
    })
    .then(user => {
      res.status(201).json(user)
    })  
    .catch(err => {
      console.log(err)
      res.status(500).json({err : 'internal server error'})
    })
  }

  static loginManual(req, res) {
    let userFound = null
    User.findOne({
      email : req.body.email
    })
    .then(user => {
      if(!user) {
        throw '404'
      } else {
        userFound = user
        return compareHash(req.body.password, userFound.password)
      }
    })
    .then(verifyHash => {
      if(verifyHash) {
        const token = jwt.sign( {
          _id : userFound._id
        }, process.env.SECRET_JWT, {expiresIn : '1h'})
        res.status(200).json({token : token})
      } else {
        throw '401'
      }
    })
    .catch(err => {
      console.log(err)
      if(err == '404') {
        res.status(404).json({msg : 'User Not Found'})
      } else if(err == '401') {
        res.status(401).json({msg : 'Unauthorized'})
      } else {
        res.status(500).json({msg : 'internal server error'})
      }
    })
  }

  static loginGoogle(req, res) {
    const CLIENT_ID = process.env.clientId
    const client = new OAuth2Client(CLIENT_ID)
    let user = null
    client.verifyIdToken({
      idToken : req.headers.token,
      audience : CLIENT_ID
    })
    .then(ticket => {
      user = ticket.getPayload()
      return User.findOne({
        email : user.email
      })
  
    })
    .then(findUser => {
      if(findUser == null) {
        return User.create({
          email : user.email,
          name : user.given_name + " " + user.family_name,
          password : 'undefined',
          type : 'auto'
        })
        .then(user => {
          const token = jwt.sign( {
            email : user.email
          }, process.env.SECRET_JWT, {expiresIn : '1h'})
          res.status(200).json({token : token})
        })
      } else {
        user = findUser
        const token = jwt.sign( {
          email : user.email
        }, process.env.SECRET_JWT, {expiresIn : '1h'})
        res.status(200).json({token : token})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err : err.message})
    })
  }


}

module.exports = UserController