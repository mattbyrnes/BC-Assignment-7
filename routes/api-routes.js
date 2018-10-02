const db = require('../models');

module.exports = function (app) {
    app.get('/api/todo', function (req, res) {
        db.ToDo.find({})
            .then(function (dbToDo) {
                res.json(dbToDo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/todo', function (req, res) {
        db.ToDo.create(req.body)
            .then(function (dbToDo) {
                res.json(dbToDo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete('/api/todo/', function (req, res) {
        console.log( req.body );
        db.ToDo.deleteOne({ itemID: req.body.itemID })
            .then(function (dbToDo) {
                res.json(dbToDo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Updating To Do //
    app.put('/api/todo', function (req, res) {
        db.ToDo.findOneAndUpdate({ itemID: req.body.itemID }, { $set: { itemID: req.body.itemID } })
            .then(function (dbToDo) {
                res.json(dbToDo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};