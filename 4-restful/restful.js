import express from 'express';
import petsData from '../pets.json' assert {type: 'json'};
const app = express();

app.use(express.json());

app.use(logger)

// CRUD 
// app 
app.get('/pets', (req, res) => {
    res.send(petsData)
})
// post
app.post('/pets', (req, res) => {
    let body = req.body
    if (body.name == undefined || body.age == undefined || body.kind == undefined) {
        let response = req.method + " " + JSON.stringify(req.body) + " " + req.url + " Bad Request";
        res.status(400).send(response)
    }
    let newPet = req.body
    petsData.push(newPet);
    res.status(201).send(newPet)
})  

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
app.patch('/pets/3', (req, res) => {
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

/////////////////////// Bonus :

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