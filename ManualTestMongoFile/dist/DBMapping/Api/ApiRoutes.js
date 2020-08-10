"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GroupUser_1 = require("./GroupUser");
const User_1 = require("./User");
const Dishes_1 = require("./Dishes");
const Ingredients_1 = require("./Ingredients");
let router = express.Router();
router.use('/GroupUser', GroupUser_1.default);
router.use('/User', User_1.default);
router.use('/Dishes', Dishes_1.default);
router.use('/Ingredients', Ingredients_1.default);
exports.default = router;
//# sourceMappingURL=ApiRoutes.js.map