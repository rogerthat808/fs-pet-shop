//////////////////////////////// DEPENDENCIES /////////////
import express from 'express';
const app = express(); // server
const port = 8000;
import petsJSON from '../pets.json' assert { type: "json" };

// req.body is undefined by default
app.use(express.json()) // Populates req.body

//////////////////////////////// PETS RESPONSE /////////////
app.get('/pets', (req, res) => {
    res.status(200).send(petsJSON);
    console.log(petsJSON);
});

//////////////////////////////// PET INDEXED RESPONSE /////////////
app.get('/pets/:index', (req, res) => {
    let { index } = req.params;
    if (index >= 0 && index < petsJSON.length) {
        res.status(200).send(petsJSON[index]);
        console.log(petsJSON[index]);
    }
    else {
        res.status(404).send('Not Found');
    }
});

//////////////////////////////// ERROR RESPONSES /////////////
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

//////////////////////////////// POST REQUEST /////////////
app.post('/pets', (req, res) => {
    const newPet = req.body; // Assigns newPet
    console.log(newPet); // No longer undefined
    petsJSON.push(newPet); // Add pet
    res.status(200).send(newPet);
});

//////////////////////////////// LISTEN /////////////
app.listen(port, () => {
    console.log('server is running');
});