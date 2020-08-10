var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupUserSchema = new Schema({userList:[{type:mongoose.Schema.Types.ObjectId}],dishList:[],shoppingList:[{type:mongoose.Schema.Types.ObjectId}],name:String,imgUrl:String,__v:Number});

const GroupUserData = mongoose.model("GroupUser", GroupUserSchema, "GroupUser");

const GroupUser = {
create : async (objToCreate : any) => (new GroupUserData(objToCreate)).save(),

readByField : async (objFilter : any = {}) => await GroupUserData.find(objFilter),
readById : async (dataId : string) => mongoose.Types.ObjectId.isValid(dataId) ? (await GroupUserData.find({_id : dataId}))[0] : null,

update : async (document : any) => await document.save(),

delete : async (dataId : any) => mongoose.Types.ObjectId.isValid(dataId) ? await GroupUserData.deleteOne({_id : dataId}) : null,

}

export default GroupUser;