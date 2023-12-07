//////////////////////////////// DEPENDENCIES /////////////
import express from 'express';
const app = express();
const port = 8000;
import petsJSON from '../pets.json' assert { type: "json" };

//////////////////////////////// PETS RESPONSE /////////////
app.get('/pets', (req, res) => {
    res.status(200).send(petsJSON);
    console.log(petsJSON);
});

//////////////////////////////// PET 0 RESPONSE /////////////
app.get('/pets/0', (req, res) => {
    res.status(200).send(petsJSON[0]);
    console.log(petsJSON[0]);
});

//////////////////////////////// PET 1 RESPONSE /////////////
app.get('/pets/1', (req, res) => {
    res.status(200).send(petsJSON[1]);
    console.log(petsJSON[1]);
});

//////////////////////////////// ERROR RESPONSE /////////////
app.get('/pets/:index', (req, res) => {
    let { index } = req.params
    console.log(request parameters\n${req.params});
    res.status(404).send('Not Found');
});

//////////////////////////////// LISTEN /////////////
app.listen(port, () => {
    console.log('server is running');
});