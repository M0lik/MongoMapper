import Dishes from './Dishes';
import * as mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/Geti', { useNewUrlParser: true, useUnifiedTopology: true });


Dishes.readByField()
    .then(data => {
        console.log(data);
        mongoose.disconnect();
    })
    .catch(e => {
        mongoose.disconnect();
    });