const express = require('express');
const db = require('./db');
const app = express();
const { Person, Place, Thing } = db.models;

