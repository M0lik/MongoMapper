var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientsSchema = new Schema({name:String,category:String});

const IngredientsData = mongoose.model("Ingredients", IngredientsSchema, "Ingredients");

const Ingredients = {
create : async (objToCreate : any) => (new IngredientsData(objToCreate)).save(),

readByField : async (objFilter : any = {}) => await IngredientsData.find(objFilter),
readById : async (dataId : string) => mongoose.Types.ObjectId.isValid(dataId) ? (await IngredientsData.find({_id : dataId}))[0] : null,

update : async (document : any) => await document.save(),

delete : async (dataId : any) => mongoose.Types.ObjectId.isValid(dataId) ? await IngredientsData.deleteOne({_id : dataId}) : null,

}

export default Ingredients;