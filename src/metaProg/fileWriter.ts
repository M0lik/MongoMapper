import * as fs from 'fs';

/**
 *
 *
 * @export
 * @class FileWriter
 */
export default class FileWriter {
    private _file: string = '';
    private _collectionName: string = '';
    private _dataTypeName: string = '';

    /**
     *Creates an instance of FileWriter.
     * @param {string} fileName the name of the mongoose schema, it will write 'name + Schema'
     * @param {string} schema the schema structure to write
     * @memberof FileWriter
     */
    constructor(fileName: string, schema: string) {
        console.log('schema : ', schema);
        this._collectionName = fileName;
        this._dataTypeName = `${this._collectionName}Data`;
        this._file = this.header() + JSON.stringify(schema).replace(/['"]+/g, '') + this.footer();
    }

    private header = () => "var mongoose = require('mongoose');\n" +
        "var Schema = mongoose.Schema;\n" +
        "\n" +
        `var ${this._collectionName}Schema = new Schema(`;

    private footer = () => `);\n` +
        "\n" +
        `const ${this._collectionName}Data = mongoose.model("${this._collectionName}", ${this._collectionName}Schema, "${this._collectionName}");\n` +
        "\n" +
        `const ${this._collectionName} = {\n` +
        this.crud() +
        "}\n\n" +
        `export default ${this._collectionName};`;

    private create = () => `create : async (objToCreate : any) => (new ${this._dataTypeName}(objToCreate)).save(),\n`;

    private readByField = () => `readByField : async (objFilter : any = {}) => await ${this._dataTypeName}.find(objFilter),\n`;
    private readById = () => `readById : async (dataId : string) => mongoose.Types.ObjectId.isValid(dataId) ? (await ${this._dataTypeName}.find({_id : dataId}))[0] : null,\n`;
    private read = () => this.readByField() + this.readById();

    private update = () => 'update : async (document : any) => await document.save(),\n';

    private delete = () => `delete : async (dataId : any) => mongoose.Types.ObjectId.isValid(dataId) ? await ${this._dataTypeName}.deleteOne({_id : dataId}) : null,\n`;

    private crud = () => `${this.create()}\n${this.read()}\n${this.update()}\n${this.delete()}\n`;

    getFileAsString = () => this._file;

    write = (pathToWriteFile: string) => fs.writeFileSync(pathToWriteFile, this._file, { encoding: 'utf8', flag: 'w' });
}