import Ingredients from '../Schema/Ingredients';

import * as express from 'express';

let router = express.Router();

router.get('/', async (req, res) => {
        let result = await Ingredients.readByField();
        res.send(result);
    });

router.get('/:id', async (req, res) => {
        let result = await Ingredients.readById(req.params.id);
        res.send(result);
    });

router.post('/', async (req, res) => {
        let create = await Ingredients.create(req.body);
        res.sendStatus(200);
    });

router.delete('/:id', async (req, res) => {
        let result = await Ingredients.delete(req.params.id);
        res.send(result);
    });

export default router;