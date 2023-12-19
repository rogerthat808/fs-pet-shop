import express from 'express';
import petsData from '../pets.json' assert {type: 'json'};
import fs from 'fs'

////////////////// database
import pg from 'pg';
import { error } from 'console';

let client = new pg.Client({
    database: "petsdb"
})

await client.connect()

const app = express();

app.use(express.json());

app.use(logger)

// CRUD 
app.get('/pets', async (req, res) => {
    try {
        const checkEmptyQuery = 'SELECT COUNT(*) FROM pets';
        const checkResult = await client.query(checkEmptyQuery);
        const tableIsEmpty = checkResult.rows[0].count === '0';

        if (tableIsEmpty) {
            const data = await fs.promises.readFile('../pets.json', 'utf-8');
            const petsFromJson = JSON.parse(data);
            const insertQuery = 'INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)';

            for (let i = 0; i < petsFromJson.length; i++) {
                const pet = petsFromJson[i];
                const values = [pet.name, pet.age, pet.kind];
                await client.query(insertQuery, values);
            }
            res.send(data);
        } else {
            res.send(petsData);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing data');
    }
});

app.post('/pets', async (req, res) => {
    let body = req.body;

    if (body.name === undefined || body.age === undefined || body.kind === undefined) {
        let response = `${req.method} ${JSON.stringify(req.body)} ${req.url} Bad Request`;
        res.status(400).send(response);
        // if above statement is true then return nothing.
        return;
    }
    // if if statement is false then try this 
    try {
        let newPet = req.body;
        const queryText = 'INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3)'; //1,2,3 are placeholders in sql
        const values = [body.name, body.age, body.kind];
        const result = await client.query(queryText, values);

        let petsData = [];
        if (fs.existsSync('../pets.json')) {
            const data = fs.readFileSync('../pets.json', 'utf-8');
            petsData = JSON.parse(data);
        }

        petsData.push(newPet);
        fs.writeFileSync('../pets.json', JSON.stringify(petsData), 'utf-8');
        res.status(201).send(newPet);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error inserting pet');
    }
});

app.get('/pets/3', (req, res) => {
    let thirdPet = petsData[2]
        if (thirdPet == null) {
            res.status(404).send('Not Found')
        } else {
            res.status(200).send(thirdPet)
        }
})

app.patch('/pets/3', async (req, res) => {
    let thirdPet = petsData[2]
    let body = req.body;
    thirdPet.name = body.name
    thirdPet.age = body.age
    thirdPet.kind = body.kind

    petsData[2] = thirdPet

    fs.writeFile("../pets.json", JSON.stringify(petsData), 'utf-8', async (error) => {
        if (error) {
            console.error(error)
            res.status(500).send('error updating pet')
            return;

        }
        await client.query('UPDATE pets SET name = $1, age = $2, kind = $3 WHERE id = $4', [body.name, body.age, body.kind, 3]);
        res.status(200).send(petsData)
    })
})

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