import objToSchema from './ObjToSchema';
import * as fs from 'fs';
var MongoClient = require('mongodb').MongoClient;

const uri: string = "mongodb://127.0.0.1:27017/Test";

const client = MongoClient(uri, { useUnifiedTopology: true });
const dbName = 'Test';

function getHeader(className : String) {
  return `var mongoose = require('mongoose');\n \
  var Schema = mongoose.Schema;\n \
  \n \
  var ${className}Schema = new Schema(`;
}

function getFooter(){
  return `);`;
}

let getListOfData = async () => {
  try {
    let connection = (await client.connect()).db(dbName);
    let list: any[] = await connection.listCollections().toArray();
    let schemaList: any[] = [];

    for (let i = 0; i < list.length; i++) {
      let collection = list[i];
      let tmp = (await connection.collection(collection.name).find().toArray())[0];
      delete tmp._id;
      let schema = objToSchema(tmp);
      schemaList.push({ Filename: collection.name, schema });
    }

    return schemaList;
  } catch (err) {
    console.error("ERROR : ", err);
  }
}

let mapperFile = async () => {
  try {
    let dataList = await getListOfData();

    var dir = './DBMapping';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    dataList.map(data => {
      let filePath = dir + '/' + data.Filename + '.ts';

      let fileContent = getHeader(data.Filename) + JSON.stringify(data.schema) + getFooter();
      fs.writeFileSync(filePath, fileContent, {encoding:'utf8',flag:'w'});
    })
    return ;
  } catch (err) {
    console.error("ERROR : ", err);
  }
}

mapperFile();