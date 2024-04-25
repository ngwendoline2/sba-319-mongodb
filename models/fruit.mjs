import mongoose, { mongo } from 'mongoose';

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    readyToEat: Boolean
});

const Fruit = mongoose.model('Fruit', fruitSchema);

export default Fruit;