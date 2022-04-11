const mongoClient = require('mongodb').MongoClient;
var express = require('express');
const mongodb = require('mongodb');
const url = 'mongodb://localhost:27017/';
var router = express.Router();

router.post('/', function (req, res, next) {
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbObj = db.db('Clinic');
        let newPatient = req.body
        dbObj.collection('Users').insertOne(newPatient, (err, res) => {
            if (err) throw err;
            console.log('Document inserted');
            db.close();
        });
    });
});

router.get('/', function (req, res, next) {
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('Clinic');
        dbo.collection('Users').find().toArray((err, result) => {
            if (err) throw err;
            res.json(result)
            db.close();
        });
    });
});

router.delete('/:id', function (req, res) {
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('Clinic');
        let param = {
            _id: new mongodb.ObjectId(req.params.id)
        };
        dbo.collection('Users').deleteOne(param, (err, result) => {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
})

router.put('/:id', (req, res) => {
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('Clinic');
        let query = {
            _id: new mongodb.ObjectId(req.params.id)
        };
        let newValues = {
            $set: req.body
        };
        dbo.collection('Users').updateOne(query, newValues, (err, res) => {
            if (err) throw err;
            console.log('Collection updated successfully');
            db.close();
        });
    });
});

router.get('/:param', (req, res) => {
    let param = req.params.param;
    mongoClient.connect(url, {
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) throw err;
        let dbo = db.db('Clinic');
        //   let query = {name: new RegExp(param,'i')}; //Searches by fullname, case insensitive

        let query = {
            $or: [{
                    name: new RegExp(param, 'i')
                },
                {
                    email: new RegExp(param, 'i')
                },
                {
                    password: new RegExp(param, 'i')
                },
            ]
        }
        dbo.collection('Users').find(query).toArray((err, result) => {
            if (err) throw err;
            console.log(result)
            res.send(JSON.stringify(result));
            console.log("sa")
            db.close()
            res.end();
        });
    });
});

module.exports = router;