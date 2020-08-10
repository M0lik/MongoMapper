import GroupUser from '../Schema/GroupUser';

import * as express from 'express';

let router = express.Router();

router.get('/', async (req, res) => {
        let result = await GroupUser.readByField();
        res.send(result);
    });

router.get('/:id', async (req, res) => {
        let result = await GroupUser.readById(req.params.id);
        res.send(result);
    });

router.post('/', async (req, res) => {
        let create = await GroupUser.create(req.body);
        res.sendStatus(200);
    });

router.delete('/:id', async (req, res) => {
        let result = await GroupUser.delete(req.params.id);
        res.send(result);
    });

export default router;