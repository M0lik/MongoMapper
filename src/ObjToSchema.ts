function resArray(arr: any[]): any[] {
    const schema = [];
    for (let i = 0; i < arr.length; i++)
        schema.push(resObject(arr[i]));
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

export default function resObject(obj: Object): Object {
    const schema = {};

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