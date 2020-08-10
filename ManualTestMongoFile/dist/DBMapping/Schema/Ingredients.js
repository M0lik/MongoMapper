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
var IngredientsSchema = new Schema({ name: String, category: String });
const IngredientsData = mongoose.model("Ingredients", IngredientsSchema, "Ingredients");
const Ingredients = {
    create: (objToCreate) => __awaiter(void 0, void 0, void 0, function* () { return (new IngredientsData(objToCreate)).save(); }),
    readByField: (objFilter = {}) => __awaiter(void 0, void 0, void 0, function* () { return yield IngredientsData.find(objFilter); }),
    readById: (dataId) => __awaiter(void 0, void 0, void 0, function* () { return mongoose.Types.ObjectId.isValid(dataId) ? (yield IngredientsData.find({ _id: dataId }))[0] : null; }),
    update: (document) => __awaiter(void 0, void 0, void 0, function* () { return yield document.save(); }),
    delete: (dataId) => __awaiter(void 0, void 0, void 0, function* () { return mongoose.Types.ObjectId.isValid(dataId) ? yield IngredientsData.deleteOne({ _id: dataId }) : null; }),
};
exports.default = Ingredients;
//# sourceMappingURL=Ingredients.js.map