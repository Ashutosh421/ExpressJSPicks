/* eslint-disable max-len */
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const usersModel = require('../models/usersModel');

const usersController = {

    getUsers: (req, res) => {
        (async () => {
            fs.readFile(path.join(__dirname, '../views/users.ejs'), {
                encoding: 'utf8',
            }, (err, data) => {
                if (err) {
                    console.log(`Unable to read file: ${err}`);
                    res.end();
                } else {
                    usersModel.getUsers().then((userData) => {
                        const usersFixture = ejs.compile(data);
                        const usersTemplate = usersFixture({ users: userData });
                        res.send(usersTemplate);
                    })
                    .catch((err) => {
                        console.log(`Error receiving data: ${err}`);
                    });
                }
            });
        })();
    },

    addUser: (req, res) => {
        console.log(`Trying to add user: ${JSON.stringify(req.body)}`);
        usersModel.addUser(req.body.firstName, req.body.lastName, req.body.age, req.body.occupation)
        .then(() => {
            res.send({'added': 'true'});
            console.log(`Successfully added user to the Database`);
        })
        .catch((err) => res.status(400));
    },
};

module.exports = usersController;
