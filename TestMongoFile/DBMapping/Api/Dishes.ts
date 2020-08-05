import Dishes from '../Schema/Dishes';

import * as express from 'express';

let router = express.Router();

router.get('/', async (req, res) => {
        let result = await Dishes.readByField();
        res.send(result);
    });

router.get('/:id', async (req, res) => {
        let result = await Dishes.readById(req.params.id);
        res.send(result);
    });

router.post('/', async (req, res) => {
        let create = await Dishes.create(req.body);
        res.sendStatus(200);
    });

router.delete('/:id', async (req, res) => {
        let result = await Dishes.delete(req.params.id);
        res.send(result);
    });

export default router;