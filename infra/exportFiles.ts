import * as json2csv from "json2csv";
import * as uuid from "uuid";
import * as fs from 'fs';
 
const fields = ['_id', 'hat', 'title', 'text', 'author', 'img', 'publishDate', 'link', 'active'];
const opts = { fields };
 
class ExportFiles {
 
    tocsv = function (characters) {
        try {
 
            const csv = json2csv.parse(characters, opts);
            const filename = uuid.v4() + ".csv"
            fs.writeFile('./exports/' + filename, csv, function (err) {
                if (err) throw err;
                console.log('file saved');
            });
 
            return filename;
 
        } catch (err) {
            console.error(err);
        }
    }
}
 
export default new ExportFiles();