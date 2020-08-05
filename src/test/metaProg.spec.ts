import ApiRoutes from "../metaProg/ApiRoutes";
import ApiWriter from "../metaProg/apiWriter";
import FileWriter from "../metaProg/fileWriter";

describe('Api Routes', () => {
    const fileName: string[] = ['Test1', 'Test2']; 

    test('Test filename', () => {
        let l = new ApiRoutes(fileName);
        let a = l.getFileAsString();
        expect(a).toMatchSnapshot();
    })
});

describe('Api Writer', () => {
    const fileName: string = 'Test1'; 

    test('Test filename', () => {
        let l = new ApiWriter(fileName);
        let a = l.getFileAsString();
        expect(a).toMatchSnapshot();
    })
});

describe('file writer', () => {
    const fileName: string = 'Test1'; 
    const schema: any = {title : 'titre'};

    test('Test whithout filename', () => {
        let l = new FileWriter(fileName, schema);
        let a = l.getFileAsString();
        expect(a).toMatchSnapshot();
    })
});