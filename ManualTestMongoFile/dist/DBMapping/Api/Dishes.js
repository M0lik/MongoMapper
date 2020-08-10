"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dishes_1 = require("../Schema/Dishes");
const express = require("express");
let router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Dishes_1.default.readByField();
    res.send(result);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Dishes_1.default.readById(req.params.id);
    res.send(result);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let create = yield Dishes_1.default.create(req.body);
    res.sendStatus(200);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Dishes_1.default.delete(req.params.id);
    res.send(result);
}));
exports.default = router;
//# sourceMappingURL=Dishes.js.map