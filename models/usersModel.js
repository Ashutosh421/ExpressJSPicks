const MongoDBConnector = require('../helper/MongoDBConnection');

const usersModel = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            MongoDBConnector.db.collection('testColl')
                .find({})
                .toArray((err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
        });
    },
    addUser: (firstName, lastName, age, occupation) => {
        return new Promise((resolve, reject) => {
            MongoDBConnector.db.collection('testColl').insertOne({
                'firstName': firstName,
                'lastName': lastName,
                'age': age,
                'occupation': occupation,
            }, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    },
};

module.exports = usersModel;
