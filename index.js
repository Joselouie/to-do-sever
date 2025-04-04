import express, { json } from "express";
import { db } from "./db.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT =3000;


app.get('/get-users',(req, res) => {
    const query = "SELECT * FROM users";
    db.query(query)
    .then(users => {
        res.status(200).json({users: users.rows});
    });
});
app.get('/get-titles',(req, res) => {
    const query = "SELECT * FROM users";
    db.query(query)
    .then(titles => {
        res.status(200).json({titles: titles.rows});
    });
});
app.get('/get-lists',(req, res) => {
    const query = "SELECT * FROM users";
    db.query(query)
    .then(lists => {
        res.status(200).json({lists: lists.rows});
    });
});


app.post('/check-user', (req, res) =>{
    const { username,password } = req.body;

    const query = "SELECT * FROM users WHERE username=$1 AND password=$2";

    db.query(query,[username,password])
    .then(result =>{
        if(result.rowCount > 0) {
            res.status(200).json({ exist: true });

        }
        else {
            res.status(200).json({ exist: false});
        }
    });
});



app.post('/register', (req, res) => {
    const {username,password,fname,lname} = req.body;

    const query = "INSERT INTO account (username,password,fname,lname) VALUES ($1,$2,$3,$4)";
    db.query(query, [username,password,fname,lname])
    .then(result => {
        res.status(200).json({ success: true});
    });
});
//ADD list
app.post('/add-list', (req, res) => {
    const {id,title_id,list_desc,status} = req.body;

    const query = "INSERT INTO list (id,title_id,list_desc,status) VALUES ($1,$2,$3,$4)";
    db.query(query, [id,title_id,list_desc,status])
    .then(result => {
        res.status(200).json({ success: true});
    });
});
//ADD titles
app.post('/add-titles', (req, res) => {
    const {id,username,title,date_modified,status} = req.body;

    const query = "INSERT INTO titles (id,username,title,date_modified,status) VALUES ($1,$2,$3,$4,$5)";
    db.query(query, [id,username,title,date_modified,status])
    .then(result => {
        res.status(200).json({ success: true});
    });
});
app.post('.add-to-do'), (req,res) => {
const {id,username,title,date_modified,status,title_id,list_desc} = req.body;

const query = "INSERT INTO titles (id,username,title,date_modified,status) VALUES ($1,$2,$3,$4,$5)";
const query2 = "INSERT INTO list (id,title_id,list_desc,status) VALUES ($1,$2,$3,$4)";

db.query(query, [id,username,title,date_modified,status])
db.query(query2, [id,title_id,list_desc])

.then(result => {
    res,status(200).json({success:true});
});
};
//delete-to-do
app.get('/delete-to-do',(req,res) => {
    res.send('delete');
});
//update-to-do
app.get('/update-to-do',(req,res) => {
    res.send('update');
});
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

