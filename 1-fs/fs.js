const fs = require("fs");
let selection = process.argv[2];
let index = parseInt(process.argv[3]);

console.error("Usage: node 'file name' [create, read, update, destroy] [index]");

switch (selection) {
    case 'create':
        console.error('Usage: node fs.js create AGE KIND NAME');
        createNew();
        break;
    case 'read':
        readJSON();
        break;
    case 'update':
        updatePets();
        break;
    case 'destroy':
        console.log('destroy selected');
        break;
}

function createNew() {
    console.log('create selected');
    let age = process.argv[4];
    let kind = process.argv[5];
    let name = process.argv[6];

    if (name !== undefined) {
        fs.readFile('./../pets.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            let pets = JSON.parse(data);

            let obj = {
                'age': Number(age),
                'kind': kind,
                'name': name
            };

            pets.push(obj);

            let string = JSON.stringify(pets);

            fs.writeFile('./../pets.json', string, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log('File updated successfully!');
            });

            console.log(pets);
        });
    } else {
        console.error('Name not provided. Object not added to the file.');
    }
}

function readJSON() {
    fs.readFile('./../pets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        let pets = JSON.parse(data);

        if (index >= 0 && index < pets.length) {
            console.log(pets[index]);
        } else {
            console.error(`Access a single object with node fs.js read [0 - ${pets.length - 1}]`);
            console.log(pets);
        }
    });
}

function updatePets() {
    console.log('update selected');
}

function destroy() {
    console.log('destroy selected');
}
