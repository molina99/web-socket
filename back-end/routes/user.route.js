;
'use strict'

const express = require('express')
let api = express.Router()

const userControl = require('../controls/user.control')

api.post('/postUser', userControl.postUser)

module.exports = api
