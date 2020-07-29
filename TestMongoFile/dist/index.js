"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dishes_1 = require("./Dishes");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Geti', { useNewUrlParser: true, useUnifiedTopology: true });
Dishes_1.default.readByField()
    .then(data => {
    console.log(data);
    mongoose.disconnect();
})
    .catch(e => {
    mongoose.disconnect();
});
//# sourceMappingURL=index.js.map