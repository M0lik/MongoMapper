import * as mongoose from 'mongoose';

/**
 *
 *
 * @export
 * @param {Object} arr is the array to resolve.
 * @returns {Object} return an array of inner deduced type.
 */
function resArray(arr: any[]): any[] {
    if (arr.length === 0)
        return [];

    let type = toMongooseType(arr[0]);

    //we try to resolve a complex type
    if (type === null)
        return [resObject(arr[0])];
    //we have already resolve the simple type
    else
        return [{ type: type }];
}

/**
 *
 *
 * @export
 * @param {Object} val simple value of which the type is needed.
 * @returns {Object} return the name of the deducted type as string.
 */
function toMongooseType(val: any): string {
    if (mongoose.Types.ObjectId.isValid(val.toString()))
        return 'mongoose.Schema.Types.ObjectId';
    else if (val instanceof Date)
        return 'Date';
    else
        switch (typeof val) {
            case 'boolean': return 'Boolean';
            case 'string': return 'String';
            case 'number': return 'Number';
            default: return null;
        }
}

/**
 *
 *
 * @export
 * @param {Object} obj object to transform in mongoose schema
 * @returns {Object} mongooseSchema like object
 */
export default function resObject(obj: Object): Object {
    const schema = {};

    // we assign to key the 'tree' of deducted value of associated type
    for (const key in obj)
        // we check primary Array beacause typeof [] is object.
        if (obj[key] instanceof Array)
            schema[key] = resArray(obj[key]);
        // resolutioon of inner object {object1 : {object2 : '' }}
        else if (typeof obj[key] === 'object')
            schema[key] = resObject(obj[key]);
        // we resolve the other case. The other case must be 'simple' type.
        else
            schema[key] = toMongooseType(obj[key]);

    return schema;
}