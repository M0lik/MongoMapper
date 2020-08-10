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
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({ groupUserList: [{ type: mongoose.Schema.Types.ObjectId }], dishList: [{ type: mongoose.Schema.Types.ObjectId }], shoppingList: [{ type: mongoose.Schema.Types.ObjectId }], userName: String, uid: String, email: String, __v: Number });
const UserData = mongoose.model("User", UserSchema, "User");
const User = {
    create: (objToCreate) => __awaiter(void 0, void 0, void 0, function* () { return (new UserData(objToCreate)).save(); }),
    readByField: (objFilter = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield UserData.find(objFilter); }),
    readById: (dataId) => __awaiter(void 0, void 0, void 0, function* () { return mongoose.Types.ObjectId.isValid(dataId) ? (yield UserData.find({ _id: dataId }))[0] : null; }),
    update: (document) => __awaiter(void 0, void 0, void 0, function* () { return yield document.save(); }),
    delete: (dataId) => __awaiter(void 0, void 0, void 0, function* () { return mongoose.Types.ObjectId.isValid(dataId) ? yield UserData.deleteOne({ _id: dataId }) : null; }),
};
exports.default = User;
//# sourceMappingURL=User.js.map