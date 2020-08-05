import User from '../Schema/User';

import * as express from 'express';

let router = express.Router();

router.get('/', async (req, res) => {
        let result = await User.readByField();
        res.send(result);
    });

router.get('/:id', async (req, res) => {
        let result = await User.readById(req.params.id);
        res.send(result);
    });

router.post('/', async (req, res) => {
        let create = await User.create(req.body);
        res.sendStatus(200);
    });

router.delete('/:id', async (req, res) => {
        let result = await User.delete(req.params.id);
        res.send(result);
    });

export default router;