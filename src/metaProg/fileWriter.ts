import * as fs from 'fs';
import { create } from 'domain';

/**
 *
 *
 * @export
 * @class FileWriter
 */
export default class FileWriter {

    private _file: string = '';
    private _collectionName: string = '';

    /**
     *Creates an instance of FileWriter.
     * @param {string} fileName the name of the mongoose schema, it will write 'name + Schema'
     * @param {string} schema the schema structure to write
     * @memberof FileWriter
     */
    constructor(fileName: string, schema: string) {
        this._collectionName = fileName;
        this._file = this.header() + JSON.stringify(schema) + this.footer();
    }

    private header() {
        return "var mongoose = require('mongoose');\n" +
            "var Schema = mongoose.Schema;\n" +
            "\n" +
            `var ${this._collectionName}Schema = new Schema(`;
    }

    private footer() {
        return `);\n` +
            "\n" +
            `const ${this._collectionName}Data = mongoose.model("${this._collectionName}", ${this._collectionName}Schema, "${this._collectionName}");\n` +
            "\n" +
            `const ${this._collectionName} = {\n` +
            this.crud() +
            "}\n\n" +
            `export default ${this._collectionName};`;
    }

    private create() {
        const dataTypeName = `${this._collectionName}Data`;
        return 'create(objToCreate : any){\n' +
            `let tmp = new ${dataTypeName}(objToCreate);\n` +
            'tmp.save()\n' +
            '.then((data)=> {\n' +
            'console.log(data);\n' +
            '})\n' +
            '.catch((err)=> {\n' +
            'console.log(err);\n' +
            '})\n' +
            '},\n';
    }

    private read() {
        const dataTypeName = `${this._collectionName}Data`;
        const readByField = 'readByField(objFilter : any = {}){\n' +
            `${dataTypeName}\n.find(objFilter)` +
            '.then((data)=>{\n' +
            'console.log(data);\n' +
            '})\n' +
            '.catch((err)=>{\n' +
            'console.log(err);\n' +
            '})\n' +
            '},\n';

        const readById = 'readById(dataId : string){\n' +
            'if (mongoose.Types.ObjectId.isValid(dataId))' +
            `${dataTypeName}\n.find({_id : dataId})` +
            '.then((data)=>{\n' +
            'console.log(data);\n' +
            '})\n' +
            '.catch((err)=>{\n' +
            'console.log(err);\n' +
            '})\n' +
            '},\n';

        return readByField + readById;
    }
    private update() {
        return '';
    }
    private delete() {
        const dataTypeName = `${this._collectionName}Data`;
        return 'delete(dataId : any){\n' +
            'if(mongoose.Types.ObjectId.isValid(dataId)) {\n' +
            `${dataTypeName}.deleteOne({_id : dataId})\n` +
            '.then((docs)=>{\n' +
            '}).catch((err)=>{\n' +
            '})\n' +
            '}},\n';
    }

    private crud() {
        return `${this.create()}\n${this.read()}\n${this.update()}\n${this.delete()}\n`;
    }

    /**
     *
     *
     * @returns current file of writer
     * @memberof FileWriter
     */
    getFileAsString() {
        return this._file;
    }

    /**
     *
     *
     * @param {string} pathToWriteFile path where you want to write the file
     * @memberof FileWriter
     */
    write(pathToWriteFile: string) {
        fs.writeFileSync(pathToWriteFile, this._file, { encoding: 'utf8', flag: 'w' });
    }

}