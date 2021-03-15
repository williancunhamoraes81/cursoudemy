import * as fs from 'fs';

class ImportFile {

    csvToLog = function () {
        try {

            var fs = require('fs');
            var parse = require('csv-parse');
            console.log('testando leitura csv');

            var csvData = [];
            fs.createReadStream("./exports/d1a36d69-4eb1-4591-a1e8-5294eaf9d93e.csv")
                .pipe(parse({ delimiter: ',' }))
                .on('data', function (csvrow) {
                    console.log(csvrow);
                    //do something with csvrow
                    csvData.push(csvrow);
                })
                .on('end', function () {
                    //do something with csvData
                    console.log(csvData);
                });

        } catch (err) {
            console.error(err);
        }
    }
}

export default new ImportFile();
