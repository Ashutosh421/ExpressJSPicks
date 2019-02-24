const mongoDb = require('mongodb');
const mongoClient = mongoDb.MongoClient;

const keys = require('../config/keys');


const MongoDBConnector = {

    db: null,
    connectToDatabse: () => {
        return new Promise((resolve, reject) => {
            mongoClient.connect(keys.mongoDB.connectURL, {
                auth: {
                    user: keys.mongoDB.userName,
                    password: keys.mongoDB.password,
                },
            }, (err, client) => {
                if (err) {
                    console.log(`Unable to connect: ${err}`);
                    reject(err);
                }
                MongoDBConnector.db = client.db(keys.mongoDB.dbName);
                resolve(MongoDBConnector.db);
            });
        });
    },
};

module.exports = MongoDBConnector;

