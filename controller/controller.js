const express = require('express');
const router = express.Router();
const Record = require('../model/model');


router.get("/users", async function (req, res) {

    const record = await Record.get();
    if (record) {
        res.status(200).json(record);
    } else {
        res.sendStatus(404);
    }

});
router.post('/add', async (req, res) => {
    const record = await Record.create(req.body);
    res.status(200).json(record);
});

router.get('/:id', async (req, res) => {
    const record = await Record.retrieve(req.params.id);
    if (record) {
        res.status(200).json(record);
    } else {
        res.sendStatus(404);
    }
});

router.put('/:id', async (req, res) => {
    const record = await Record.update(req.params.id, req.body);
    if (record) {
        res.status(200).json(record);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', async (req, res) => {
    const record = await Record.delete(req.params.id);
    if (record) {
        res.status(200).json(record);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
