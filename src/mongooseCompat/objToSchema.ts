import * as mongoose from 'mongoose';

function resArray(arr: any[]): any[] {
    const schema = [];
    if (!!arr[0])
        schema.push(resObject(arr[0]));
    return schema;
}

function toMongooseType(val: any): string {
    switch (typeof val) {
        case 'boolean': return 'Boolean';
        case 'string': return 'String';
        case 'number': return 'Number';
        default: return typeof val;
    }
}

/**
 *
 *
 * @export
 * @param {Object} obj object to transform to mongoose schema
 * @returns {Object} mongooseSchema like object
 */
export default function resObject(obj: Object): Object {
    const schema = {};

    if (mongoose.Types.ObjectId.isValid(obj.toString()))
        return { type: 'mongoose.Schema.Types.ObjectId'};
    if (typeof obj !== "object")
        return toMongooseType(obj);
    for (const key in obj) {
        if (obj[key] instanceof Array)
            schema[key] = resArray(obj[key]);
        else if (obj[key] instanceof Date)
            schema[key] = 'Date';
        else if (typeof obj[key] === 'object')
            schema[key] = resObject(obj[key]);
        else
            schema[key] = toMongooseType(obj[key]);
    }
    return schema;
}