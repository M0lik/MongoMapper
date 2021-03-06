import objToSchema from './mongooseCompat/objToSchema';
import * as fs from 'fs';
import Config from './config';
import * as MongoDb from 'mongodb';
import FileWriter from './metaProg/fileWriter';
import ApiWriter from './metaProg/apiWriter';
import ApiRoutesWriter from './metaProg/ApiRoutes';

var MongoClient = MongoDb.MongoClient;
const client = new MongoClient(Config.uri, { useUnifiedTopology: true });

let getListOfData = async () => {
  try {
    let connection = (await client.connect()).db(Config.dbName);
    let list: any[] = await connection.listCollections().toArray();
    let schemaList: any[] = [];

    for (let i = 0; i < list.length; i++) {
      let collection = list[i];
      let tmp = (await connection.collection(collection.name).find().toArray())[0];
      delete tmp._id;
      let schema = objToSchema(tmp);
      schemaList.push({ collectionName: collection.name, schema });
    }

    return schemaList;
  } catch (err) {
    console.error("ERROR : ", err);
  }
}

async function mapperFile() {
  try {
    let dataList = await getListOfData();
    const dir = Config.exitFolder;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const schemaFolder = `${dir}/Schema`;
    const apiFolder = `${dir}/Api`;

    if (!fs.existsSync(schemaFolder)) {
      fs.mkdirSync(schemaFolder);
    }
    if (!fs.existsSync(apiFolder)) {
      fs.mkdirSync(apiFolder);
    }

    dataList.map(data => {
      let filePath = schemaFolder + '/' + data.collectionName + '.ts';

      let fw = new FileWriter(data.collectionName, data.schema);
      
      fw.write(filePath);
    })

    dataList.map(data => {
      let filePath = apiFolder + '/' + data.collectionName + '.ts';

      let fw = new ApiWriter(data.collectionName);
      
      fw.write(filePath);
    })

    let ApiRoutesInterfaceWriter = new  ApiRoutesWriter(dataList.map(x => x.collectionName));
    let filePath = apiFolder + '/ApiRoutes.ts';
    ApiRoutesInterfaceWriter.write(filePath);

    client.close();

  } catch (err) {
    console.error("ERROR : ", err);
  }
}

mapperFile()
  .then(e => console.log('Success'))
  .catch(e => console.log('Error : ', e));
