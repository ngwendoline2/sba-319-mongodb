import express from 'express';
const router = express.Router();
import Fruit from '../models/fruit.mjs';
import db from '../db/conn.mjs';

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element

// seed route
router.get("/seed", async (req, res) => {
    console.log('in seed');
    try {
        await Fruit.create([
            {
                name: 'grapefruit',
                color: "pink",
                readyToEat: true
            }, 
            {
                name: 'grape',
                color: 'purple',
                readyToEat: false
            }, 
            {
                name: 'cantelope',
                color: 'orange',
                readyToEat: true
            }
        ])
        res.status(200).redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }
});

// I - Index    GET         READ - display a list of elements
router.get('/', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({});
        res.status(200).render('fruits/Index', { fruits: foundFruits})
        // res.status(200).send(foundFruits);
    } catch (err) {
        res.status(400).send(err);
    }
})

// N - New - allows a user to input a new fruit
router.get('/new', (req, res) => {
    res.render('fruits/New');
})

// D - DELELITE - allows a user to permanently remove an item from the database
router.delete('/:id', async(req, res) => {
    try{
        const deleteFruit = await Fruit.findByIdAndDelete(req.params.id);
        console.log(deleteFruit);
        res.status(200).redirect('/fruits');
    }catch (err) {
        res.status(400).send(err);
    }
})


// U - UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    try {
        const updatedFruit = await Fruit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
            console.log(updatedFruit);
        res.redirect(`/fruits/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err);
    }
})

// C - CREATE
// I am starting with my post route so that I can see the things in my database
router.post('/', async(req, res) => {
    // // this will be useful when have a user input form
    if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on' - or the checkbox is checked
        req.body.readyToEat = true;
    } else {                            // if not checked, then it was undefined
        req.body.readyToEat = false;
    }
    console.log(req.body)

    try {
        const createdFruit = await Fruit.create(req.body);
        res.status(200).redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }
})

// E - EDIT - update an existing entry in the database
router.get("/:id/edit", async (req, res) => {
    try {
        const foundFruit = await Fruit.findById(req.params.id);
        res.status(200).render('fruits/Edit', {fruit: foundFruit});
    } catch (err) {
        res.status(400).send(err);
    }
})


// S - SHOW - show route displays details of an individual fruit
router.get('/:id', async (req, res) => {
    try {
        const foundFruit = await Fruit.findById(req.params.id);
        res.render('fruits/Show', {fruit: foundFruit});
    } catch (err) {
        res.status(400).send(err);
    }
})

export default router;