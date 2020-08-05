import * as fs from 'fs';

/**
 *
 *
 * @export
 * @class FileWriter
 */
export default class ApiWriter {
    private _file: string = '';
    private _collectionName: string = '';
    private _dataTypeName: string = '';

    /**
     *Creates an instance of FileWriter.
     * @param {string} fileName the name of the mongoose schema, it will write 'name + Schema'
     * @param {string} schema the schema structure to write
     * @memberof FileWriter
     */
    constructor(fileName: string) {
        //console.log('schema : ', schema);
        this._collectionName = fileName;
        this._dataTypeName = `${this._collectionName}Data`;
        this._file = this.header() + this.rest() + this.footer();
    }

    private header = () => "var mongoose = require('mongoose');\n" +
        "\n" +
        `import ${this._collectionName} from '../Schema/${this._collectionName}';\n` +
        "\n" +
        "mongoose.connect('mongodb://localhost/Geti', {useNewUrlParser: true, useUnifiedTopology: true});\n" +
        "\n" +
        "import express from 'express';\n" +
        "\n" +
        "let router = express.Router();\n" + "\n"
        ;

    private footer = () => `export default router;`;

    private post = () => `router.post('/', async (req, res) => {
        let create = await ${this._collectionName}.create(req.body);
        res.sendStatus(200);
    });`;

    private get = () => `router.get('/', async (req, res) => {
        let result = await ${this._collectionName}.readByField();
        res.send(result);
    });`;

    private getById = () => `router.get('/:id', async (req, res) => {
        let result = await ${this._collectionName}.readById(req.params.id);
        res.send(result);
    });`;

    private delete = () => `router.delete('/:id', async (req, res) => {
        let result = await ${this._collectionName}.delete(req.params.id);
        res.send(result);
    });`;

    private rest = () => `${this.get()}\n\n${this.getById()}\n\n${this.post()}\n\n${this.delete()}\n\n`;

    getFileAsString = () => this._file;
    write = (pathToWriteFile: string) => fs.writeFileSync(pathToWriteFile, this._file, { encoding: 'utf8', flag: 'w' });
}