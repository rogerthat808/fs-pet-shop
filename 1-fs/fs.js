let fs = require("fs"); 
    //asking for official package named fs provided by NPM / https://nodejs.org/api/fs.html
let selection = process.argv[2]
let index = process.argv[3]

console.error("Usage: node 'file name' [create, read, update, destroy] [index]")

//Decide what to do for user input on $ node fs.js
switch(selection) {
    case 'create':
        console.error('Usage: node fs.js create AGE KIND NAME')
        createNew()
        break;
    case 'read': 
        readJSON()
        break;
    case 'update':
        updatePets()
        break;
    case 'destroy':
        console.log('destroy selected')
        break;
}

function createNew() {
    console.log('create selected')
    let age = process.argv[3]
    let kind = process.argv[4]
    let name = process.argv[5]

    let obj = {
        'age': Number(age),
        'kind': kind,
        'name': name
    }

    // console.log(`created ${obj}`)
    if (obj.name != undefined) {
        fs.readFile('./../pets.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            let pets = JSON.parse(data)

            pets.push(obj)
            let string = JSON.stringify(pets)

            fs.writeFile('./../pets.json', string, 'utf8', function (err){
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
            });

            console.log(pets)
        });
    }
}

function readJSON() {
    fs.readFile('./../pets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit();
        }

        let pets = JSON.parse(data)

        if (pets[index] === undefined | pets[index] === NaN | pets[index] === null) {
            console.error(`Acess a single object with node fs.js read [ 0 - ${pets.length - 1} ]`)
            console.log(pets)
        }

        console.log(pets[index])
    });
};

function updatePets() {
    console.log('update selected')
}

function destroy() {
    console.log('destroy selected')
}