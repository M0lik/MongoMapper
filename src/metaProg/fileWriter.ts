import * as fs from 'fs';

/**
 *
 *
 * @export
 * @class FileWriter
 */
export default class FileWriter {

    private _file: string = '';

    /**
     *Creates an instance of FileWriter.
     * @param {string} fileName the name of the mongoose schema, it will write 'name + Schema'
     * @param {string} schema the schema structure to write
     * @memberof FileWriter
     */
    constructor(fileName: string, schema: string) {
        this._file = this.header(fileName) + JSON.stringify(schema) + this.footer();
    }

    private header(className: string) {
        return "var mongoose = require('mongoose');\n" +
            "var Schema = mongoose.Schema;\n" +
            "\n" +
            `var ${className}Schema = new Schema(`;
    }

    private footer() {
        return `);`;
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