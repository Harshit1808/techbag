const express = require('express');
const mysql = require('mysql2');
const AWS = require('aws-sdk');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config({ path: './.env'});

const port = process.env.PORT || 2000;
const table= process.env.TABLENAME;
const SourceEmail = process.env.SOURCEEMAIL;

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASENAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const config ={
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
}
const ses = new AWS.SES(config);

app.post('/order', (req, res) => {
    //Retrive customer details from request body
    const { name, email, address, payment } = req.body;
    //Insert customer details in database
    let sql = `INSERT INTO ${table} (name, email, address, payment) VALUES ('${name}', '${email}', '${address}', '${payment}')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error in adding deatails" , err);
            res.sendStatus(500);
            return;
        }
        //Send email to customer
        const params = {
            Source: SourceEmail,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Thank you for your order, ${name}!`
                    },
                },
                Subject: {
                    Data: 'Order Confirmation'
                }
            }
        };
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.error("Error in sending email" , err);
                res.sendStatus(500);
                return;
            }
            console.log('Email sent successfully', data);
            res.sendStatus(200);

        });
    });
});












app.get('/createdb', (req, res) => {
    let sql = 'CREATE TABLE orders (id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), payment VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Database created...');
    });
});
// app.get('/getuser', (req, res) => {
//     let sql = 'SELECT name FROM sampledb';
//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send(result);
//     });
// })
// app.post('/adduser', (req, res) => {
//     const { name, email } = req.body;
//     let sql = `INSERT INTO sampledb (name, email) VALUES ('${name}', '${email}')`;
//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         res.send('User added...');
//     });

// });
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});