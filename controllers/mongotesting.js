const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://cluster0-buryz.mongodb.net/test?retryWrites=true';
const dbName = 'testDb';

mongoClient.connect(url, {
        auth: {
            user: 'Ashutosh421',
            password: 'ashu8126$$$',
        },
    },
        (err, client) => {
            if (err) {
                console.log(`Unable to connect to the database: ${err}`);
                return;
            }

            console.log(`Connected to the Database Server`);
            const db = client.db(dbName);

            db.collection('testColl').find({}).toArray((err, result) => {
                if (err) {
                    console.log(`Unable to fetch data: ${err}`);
                    return;
                } else {
                    console.log(`Received data: ${JSON.stringify(result, 3)}`);
                }
            });
        });

