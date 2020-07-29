var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishesSchema = new Schema({name:String,ingredients:[{type:mongoose.Schema.Types.ObjectId}],pictureUrl:String,preparationSteps:[String],infos:{difficulty:String,time:String,quantity:String,price:String}});

const DishesData = mongoose.model("Dishes", DishesSchema, "Dishes");

const Dishes = {
create : async (objToCreate : any) => (new DishesData(objToCreate)).save(),

readByField : async (objFilter : any = {}) => await DishesData.find(objFilter),
readById : async (dataId : string) => mongoose.Types.ObjectId.isValid(dataId) ? (await DishesData.find({_id : dataId}))[0] : null,

update : async (document : any) => await document.save(),

delete : async (dataId : any) => mongoose.Types.ObjectId.isValid(dataId) ? await DishesData.deleteOne({_id : dataId}) : null,

}

export default Dishes;