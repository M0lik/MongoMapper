var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({groupUserList:[{type:mongoose.Schema.Types.ObjectId}],dishList:[{type:mongoose.Schema.Types.ObjectId}],shoppingList:[{type:mongoose.Schema.Types.ObjectId}],userName:String,uid:String,email:String,__v:Number});

const UserData = mongoose.model("User", UserSchema, "User");

const User = {
create : async (objToCreate : any) => (new UserData(objToCreate)).save(),

readByField : async (objFilter : any = {}) => await UserData.find(objFilter),
readById : async (dataId : string) => mongoose.Types.ObjectId.isValid(dataId) ? (await UserData.find({_id : dataId}))[0] : null,

update : async (document : any) => await document.save(),

delete : async (dataId : any) => mongoose.Types.ObjectId.isValid(dataId) ? await UserData.deleteOne({_id : dataId}) : null,

}

export default User;