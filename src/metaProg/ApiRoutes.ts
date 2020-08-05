import * as fs from 'fs';

/**
 *
 *
 * @export
 * @class FileWriter
 */
export default class ApiRoutes {
    private _file: string;
    private _collectionsNames: string[];
    /**
     *Creates an instance of FileWriter.
     * @param {string} fileName the name of the mongoose schema, it will write 'name + Schema'
     * @param {string} schema the schema structure to write
     * @memberof FileWriter
     */
    constructor(fileNames: string[]) {
        this._collectionsNames = fileNames;
        this._file = this.header() + this.routes() + this.footer();
    }

    private header = () => {
        let retStr: string = `import * as express from "express";\n\n`;

        for (const name of this._collectionsNames) {
            retStr += `import ${name}Routes from './${name}';\n`;
        }
        
        return retStr + `\nlet router = express.Router();\n\n`
    }

    private footer = () => `\nexport default router;`;

    private routes = () => {
        let result: string = '';

        for (const name of this._collectionsNames) {
            result += `router.use('/${name}', ${name}Routes);\n`;
        }

        return result;
    };

    getFileAsString = () => this._file;
    write = (pathToWriteFile: string) => fs.writeFileSync(pathToWriteFile, this._file, { encoding: 'utf8', flag: 'w' });
}