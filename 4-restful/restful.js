import express from 'express';
import petsData from '../pets.json' assert {type: 'json'};
import fs from 'fs'

////////////////// database
import pg from 'pg';

let client = new pg.Client({
    database: "petsdb"
})

await client.connect()

const app = express();

app.use(express.json());

app.use(logger)

// CRUD 
// app 
app.get('/pets', async (req, res) => {
    fs.readFile('../pets.json', 'utf-8', async (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error loading data');
        } else {
            const petsFromJson = JSON.parse(data); // Assuming petsData was loaded from JSON
            for (let i = 0; i < petsFromJson.length; i++) {
                const pet = petsFromJson[i];

                const checkQuery = 'SELECT * FROM pets WHERE id = $1';
                const checkResult = await client.query(checkQuery, [pet.id]);

                if (checkResult.rows.length === 0) {
                    // If the pet doesn't exist in the database, insert it
                    const queryText = 'INSERT INTO pets (id, name, age, kind) VALUES ($1, $2, $3, $4)';
                    const values = [pet.id, pet.name, pet.age, pet.kind];
                    await client.query(queryText, values);
                }
            }
            res.send(data);
        }
    });
});


// post
app.post('/pets', async (req, res) => {
    let body = req.body;

    if (body.name === undefined || body.age === undefined || body.kind === undefined) {
        let response = `${req.method} ${JSON.stringify(req.body)} ${req.url} Bad Request`;
        res.status(400).send(response);
        // if above statement is true then return nothing... break;
        return;
    }
    // if if statement is false then try this 
    try {
        const queryText = 'INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)'; //1,2,3 are placeholders in sql
        const values = [body.name, body.age, body.kind];

        const result = await client.query(queryText, values);
        let newPet = req.body;
        petsData.push(newPet);
        res.status(201).send(newPet);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error inserting pet');
    }
});


// get /pets/3
app.get('/pets/3', (req, res) => {
    let thirdPet = petsData[2]
        if (thirdPet == null) {
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(thirdPet)
        }
})

// PATCH /pets/3
app.patch('/pets/3', async (req, res) => {
    let thirdPet = petsData[2]
    let body = req.body;
    thirdPet.name = body.name
    res.status(200).send(petsData)
})


// delete /pets/3
app.delete('/pets/3', (req, res) => {
    let thirdPet = petsData[2]
    petsData.splice(2,1)
    res.status(200).send(thirdPet)
})

// Bonus kinda?:

app.get('/', (req, res) => {
    res.status(404).send('Not Found')
})

app.get('/blah', (req, res) => {
    res.status(404).send('Not Found')
})

app.listen(8000, () => {
    console.log('Listening on port 8000')
})

function logger(req, res, next) {
    console.log("Request method: " , req.method);
    console.log("Request path: " , req.url);
    next();
}



