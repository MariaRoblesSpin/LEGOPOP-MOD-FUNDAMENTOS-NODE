'use strict'

const readline = require('readline')

const db = require('../lib/connectMongoose')
const Ad = require('../models/Ad')
const adsData = require('../data/ads')

console.log(adsData)