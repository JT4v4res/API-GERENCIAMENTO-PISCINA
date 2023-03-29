"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var secretOrKey = (0, crypto_1.randomBytes)(32).toString('hex');
console.log(secretOrKey);
