/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);

use('group_40_41');
db.getCollection('courses').find({});

use('group_40_41');
db.getCollection('courses').insertMany(
    [
        {
            _id: 1,
            title: 'International Realations',
            students_count: 7,
            weeks: 10,
            points: 10,
            university_title: 'Harvard'
        },
        {
            _id: 2,
            title: ' Science',
            students_count: 8,
            weeks: 9,
            points: 10,
            university_title: 'Yale'
        },
        {
            _id: 3,
            title: 'Economy',
            students_count: 3,
            weeks: 6,
            points: 12,
            university_title: 'Brown'
        },
        {
            _id: 4,
            title: ' International Relations',
            students_count: 5,
            weeks: 5,
            points: 13,
            university_title: 'Brown'
        },
        {
            _id: 5,
            title: 'Economy',
            students_count: 6,
            weeks: 8,
            points: 9,
            university_title: 'Yale'
        },
        {
            _id: 6,
            title: 'German literature',
            students_count: 3,
            weeks: 7,
            points: 10,
            university_title: 'Harvard'
        },
        {
            _id: 7,
            title: 'Economy',
            students_count: 15,
            weeks: 20,
            points: 15,
            university_title: 'Harvard'
        },

    ]
);

use('group_40_41');
db.getCollection('courses').find({});

// Найти сколько курсов есть в коллекции
use('group_40_41');
db.getCollection('courses').countDocuments();

// Сколько курсов предлагает университет Harvard
use('group_40_41');
db.getCollection('courses').find({
    university_title: 'Harvard'
}).count();

// Сколько курсов предлагают университеты Harvard и Yale в сумме
use('group_40_41');
db.getCollection('courses').find({
    university_title: {$in: ['Harvard', 'Yale']}
}).count();

// Сколько есть курсов, продолжительность которых не превышает 10 недель (<= 10)
use('group_40_41');
db.getCollection('courses').find(
    {
        weeks: {$lte: 10}
    }
).count();

// Переименовать название поля
use('group_40_41');
db.getCollection('courses').updateMany(
    {},
    {$rename:{"pois": "points"}}
);

// Сколько баллов можно набрать в сумме, посетив все курсы университета Yale
use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {university_title: 'Yale'}},
    {$group: {_id: "$university_title", total: {$sum: "$points"}}},
]);


// Сколько всего недель займет прохождение курсов в Yale и Brown (в разбивке по универам) 24 / 6
use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {university_title: {$in:['Yale', 'Brown']}}},
    {$group: {_id: "$university_title", total: {$sum: "$weeks"}}},
]);

// Сколько всего недель займет прохождение курсов в Yale и Brown (без разбивки по универам) 30
// Убрать доллар из _id!!!
use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {university_title: {$in:['Yale', 'Brown']}}},
    {$group: {_id: "university_title", total: {$sum: "$weeks"}}},
]);

use('group_40_41');
db.courses.insertMany([
    {
      _id: 8,
      title: "Economy",
      students_count: 5,
      weeks: 7,
      points: 13,
      university_title: "Oxford" 
    },
    {
      _id: 9,
      title: "English literature",
      students_count: 4,
      weeks: 5,
      ponits: 10,
      university_title: "Cambridge" 
    },
    {
      _id: 10,
      title: "International Relations",
      students_count: 5,
      weeks: 10,
      points: 12,
      university_title: "Bremen University" 
    }
  ]);

// Добавить всем документам свойство country со значением 'not defined'
use('group_40_41');
db.getCollection('courses').updateMany(
    {},
    {$set:{country: 'not defined'}},
);

// Курсам в Harvard, Yale, Brown в свойство country записать USA. 
//Курсам в Oxford и Cambridge - UK. Курсам в Bremen University - Germany
use('group_40_41');
db.getCollection('courses').updateMany(
    {university_title: {$in: ['Harvard','Yale', 'Brown']}},
    {$set: {country:  'USA'}}
);

use('group_40_41');
db.getCollection('courses').updateMany(
    {university_title: {$in: ['Oxford','Cambridge']}},
    {$set: {country:  'UK'}}
);

use('group_40_41');
db.getCollection('courses').updateOne(
    {university_title: 'Bremen University' },
    {$set: {country: 'Germany'}}
);

use('group_40_41');
db.getCollection('courses').find({});


//Сколько курсов по International Relations 
//продолжительностью менее 8 недель доступно в коллекции

use('group_40_41');
db.courses.countDocuments({ 
    title: 'International Relations', 
    weeks: {$lt: 8} });

use('group_40_41');
db.getCollection('courses').find({});