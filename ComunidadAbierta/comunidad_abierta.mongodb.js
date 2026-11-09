use('ComunidadAbierta');

db.Users.drop();
db.Publications.drop();
db.Comments.drop();

db.createCollection('Users');
db.createCollection('Publications');
db.createCollection('Comments');

//id's para las relaciones
const user1 = new ObjectId();
const user2 = new ObjectId();
const user3 = new ObjectId();

//users
db.Users.insertMany([
    {_id: user1, name: 'Carlos Granados', email: 'carlosgnd23@gmail.com', registrationDate: new Date('2026-10-28')},
    {_id: user2, name: 'René Pacheco', email: 'rene.pacheco@gmail.com', registrationDate: new Date('2026-11-02')},
    {_id: user3, name: 'Nelson Rodriguez', email: 'nelson.rodriguez@gmail.com', registrationDate: new Date('2026-10-15')},
]);

//publications
const pb1 = new ObjectId();
const pb2 = new ObjectId();
const pb3 = new ObjectId();

db.Publications.insertMany([
    {_id: pb1, User_id: user1, title: 'Welcome to the community', content: 'first forum post', date: new Date('2026-10-29')}, 
    {_id: pb2, User_id: user2, title: 'Learning MongoDB', content: 'first class', date: new Date('2026-11-03')}, 
    {_id: pb3, User_id: user3, title: 'Saturday Event', content: 'it starts at 8:50 a.m', date: new Date('2026-11-05')}, 
]);

//comments
db.Comments.insertMany([
    {publication_id: pb1, User_id: user2, text: 'thank you for the welcome', date: new Date('2026-11-05')},
    {publication_id: pb1, User_id: user3, text: 'happy to be here.', date: new Date('2026-11-03')},
    {publication_id: pb2, User_id: user1, text: 'thanks!!', date: new Date('2026-11-05')},
    {publication_id: pb3, User_id: user1, text: 'where will it be?', date: new Date('2026-11-05')}
]);

//verify
db.Comments.find(); //show all comments

//esto lo aprendi investigando un poco
//lookup sirve como los JOIN de SQL
//esto devuelve cada publicacion con su autor y la lista de comentarios dentro
db.Publications.aggregate([
    { $lookup: {
      from: 'Users',
      localField: 'User_id',
      foreignField: '_id',
      as: 'autor'
    }},
    { $lookup: {
      from: 'Comments',
      localField: '_id',
      foreignField: 'publication_id',
      as: 'comments'
    }}
]);