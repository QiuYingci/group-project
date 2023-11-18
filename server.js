const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb+srv://Qiuyingci:Qyc052714@cluster0.jvmayzu.mongodb.net/?retryWrites=true&w=majority';
const dbName ='test'; //test
const app = express();
const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true});
const students = [
  { id: '123', password: '123'},
  { id: '456', password: '456'},
  { id: '789', password: '789'}
];

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const createDocument = function(db, req) {
  const collection = db.collection('student');

  collection.insertOne({
    "StudentName": req.body.student_name,
    "StudentID": req.body.student_id,
    "StudentGrade": req.body.student_grade,
    "AverageMark": req.body.average_mark,
    "StudentGender": req.body.gender
  }, function(error, results) {
    if (error) {
      console.error(error);
      res.status(500).send('Error creating document');
      return;
    }
    console.log(results);
    res.redirect('/createSucc');
  });
};


const findDocument = function(db, studentId,callback) {
  const collection = db.collection('student');

  collection.findOne({
    "StudentID": studentId
  }, function(error, results) {
    if (error) {
      throw error;
    }
    console.log(results);
    callback(results);
  });
};

const deleteDocument = function(db, req) {
  const collection = db.collection('student');

  collection.deleteOne({  
    "StudentID": req.body.student_id
  }, function(error, results) {
    if (error) {
      console.error(error);
        res.status(500).send('Error deleting document');
    }
    console.log(results);
    res.redirect('/deleteSucc');
  });
};



const updateDocument = function(db, req) {
  const collection = db.collection('student');

  collection.updateOne(
    { "StudentID": req.body.student_id },
    {
      $set: {
        "StudentName": req.body.student_name,
        "StudentGrade": req.body.student_grade,
        "AverageMark": req.body.average_mark,
        "StudentGender": req.body.gender
      }
    },
    function(error, results) {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating document');
        return;
      }
      console.log(results);
      res.redirect('/updateSucc');
    }
  );
};


app.get('/', function(req, res){
    console.log("welcome!");
    res.redirect("/login");
});
         
 app.get('/home',(req,res) => {
    res.render('home.ejs');
});


app.get('/login', (req, res) => {
  console.log("Welcome!")
  return res.status(200).render("login",{error:null});
});


app.post('/login', (req, res) => {
  const studentId = req.body.studentId;
  const password = req.body.password;

  const student = students.find(s => s.id == studentId);

  if (student && student.password === password) {
    console.log('you are successful.');
    res.redirect("/home");
    
 } else {
    const error = 'Incorrect password';
    console.log('Error.');
    res.status(200).render('login',{error:error});
    
  }
});
 
 app.get('/searchSucc',(req,res) => {
    res.render('searchSucc.ejs',);
}); 

app.get('/search',(req,res) => {
    res.render('search.ejs');
});  

app.post('/search', (req, res) => {
  const db = client.db(dbName);
  console.log("Connected successfully to the MongoDB server.");
  const studentId = req.body.student_id;
  findDocument(db, studentId, function(results){
  res.render('searchSucc.ejs',{results:results});
  res.redirect('searchSucc.ejs');
  console.log('Connected to MongoDB server closed.');
});
});

   
  app.get('/create',(req,res) => {
    res.render('create.ejs');
});  

  app.post('/create', (req, res) => {
  const db = client.db(dbName);
  console.log("Connected successfully to the MongoDB server.");
  createDocument(db, req);
  res.redirect('/createSucc');
  console.log('Connected to MongoDB server closed.');
});

 app.get('/createSucc',(req,res) => {
    res.render('createSucc.ejs');
});

app.get('/delete',(req,res) => {
    res.render('delete.ejs');
});  

  app.post('/delete', (req, res) => {
  const db = client.db(dbName);
  console.log("Connected successfully to the MongoDB server.");
  deleteDocument(db, req);
  res.redirect('/deleteSucc');
  console.log('Connected to MongoDB server closed.');
});

 app.get('/deleteSucc',(req,res) => {
    res.render('deleteSucc.ejs');
});

app.get('/update',(req,res) => {
    res.render('update.ejs');
});

app.get('/updateSucc',(req,res) => {
    res.render('updateSucc.ejs');
});

app.post('/update', (req, res) => {
  const db = client.db(dbName);
  console.log("Connected successfully to the MongoDB server.");
  updateDocument(db, req);
  res.redirect('/updateSucc');
  console.log('Connected to MongoDB server closed.');
});


app.get('/logout', function(req, res){
    console.log("Bye~~");
    res.redirect('/login');
});


app.listen(process.env.PORT || 8899);