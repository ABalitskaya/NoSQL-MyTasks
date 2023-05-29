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
db.getCollection('users').find({});

// женщины
use('group_40_41');
db.users.find({
    gender: 'f'
});

// женщины старше 23
use('group_40_41');
db.getCollection('users').find({
    $and:[
        {gender:'f'},
        {age: {$gt: 23}}
    ]
})

// женщины старше 23 короткий вариант
use('group_40_41');
db.users.find({
    gender: 'f',
    age: {$gte: 23}
})

// женщины от 20 до 24
use('group_40_41');
db.users.find({
    $and: [
        {age: {$gte: 20}},
        {age: {$lte: 24}},
        {gender:'f'}
    ]
})

// женщины от 20 до 24 короткая запись
use('group_40_41');
db.users.find({
    gender: 'f',
    age: {$gte: 20, $lte: 24}
})

// мужчины, чье имя Иван, Никита, Олег
use('group_40_41');
db.users.find({
    $and:[
        {gender: 'm'},
        {name: {$in:['Ivan', 'Nikita', 'Oleg']}}
    ]
})

// Пользователи от 30 до 40 лет
use('group_40_41');
db.users.find({
    age: {$gte: 30, $lte: 40}
});

// Удалить пользователей младше 27 лет
use('group_40_41');
db.users.deleteMany({
    age: {$lt: 27}
})

use('group_40_41');
db.users.insertOne({
    _id: 5,
    name: "Misha",
    age: 87,
    gender: 'm'
})

use('group_40_41');
db.users.find();