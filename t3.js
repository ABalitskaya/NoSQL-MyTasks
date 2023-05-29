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

//// 15. Вывести все курсы, отсортированными по продолжительности 
// курса в порядке возрастания - от самого короткого к самому длинному
use('group_40_41');
db.getCollection('courses').find({}).sort({
    weeks: 1,
});

// Вывести все курсы из Гарварда, отсортированными по 
// количеству баллов, которые можно получить за курс в порядке убывания
use('group_40_41');
db.getCollection('courses').find({
    university_title: "Harvard",
}).sort({
    points: -1,
});

//  Вывести университеты, отсортированными 
// в порядке возрастания продолжительности всех доступных курсов
use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {}}, 
    {$group: {_id: "$university_title", total: {$sum: "$weeks"}}},
    {$sort: {total: 1}}
]);

db.courses.aggregate([
    {$match: {}},
    {$group: {_id: '$university_title', total: {$sum: '$weeks'}}}
  ]).sort({ total: 1 })

// 18. Всем курсам, 
//у которых продолжительность меньше 8 недель, добавить к points 3 балла
use('group_40_41');
db.getCollection('courses').updateMany(
    {weeks: {$lt: 8}},
    {$inc: {points: 3}}
);

// // 19. Всем курсам добавить свойство students_countries со значением []
use('group_40_41');
db.getCollection('courses').updateMany(
    {},
    {$set:{students_countries: []}},
)

// 20. Университетам в Германии в students_countries добавить France
use('group_40_41');
db.getCollection('courses').updateMany(
    {country: {$in: ["Germany"]}},
    {$push: {students_countries: "France"}},
)

// Добавит только если это значение отсутствует в массиве
db.courses.updateMany(
    {country: 'Germany'},
    {$addToSet: {students_countries: 'France'}}
)

// 21. Университетам в США добавить в students_countries 
//Japan, Denmark, China.

use('group_40_41');
db.getCollection('courses').updateMany(
    {country: "USA"},
    {$addToSet: {students_countries: {$each: ["Japan", "Denmark", "Korea"]}}}
)

// 22. Университетам в Великобритании 
//добавить в students_countries USA, Germany

use('group_40_41');
db.getCollection('courses').updateMany(
    {country: "UK"},
    {$addToSet: {students_countries: {$each: ["USA", "Germany"]}}}
)

// 23. Всем университетам добавить Japan, India (без повторов в массиве)

use('group_40_41');
db.getCollection('courses').updateMany(
    {},
    {$addToSet: {students_countries: {$each: ["Japan", "India"]}}}
)

// 24. Переименовать students_countries в students_origin
use('group_40_41');
db.getCollection('courses').updateMany(
    {},
    {$rename:{"students_countries": "students_origin"}}
);

// 25. Найти сколько баллов можно набрать в сумме, посетив все курсы университетов 
//Bremen University и Oxford (2 значения - в разбивке по универам)

use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {university_title: {$in: ["Bremen University", "Oxford"]}}}, 
    {$group: {_id: "$university_title", total: {$sum: "$points"}}},
]);

// 26. Найти сколько баллов можно набрать в сумме, посетив все курсы университетов 
//Bremen University и Oxford (1 значение - без разбивки по универам)

use('group_40_41');
db.getCollection('courses').aggregate([
    {$match: {university_title: {$in: ["Bremen University", "Oxford"]}}}, 
    {$group: {_id: "university_title", total: {$sum: "$points"}}},
]);

use('group_40_41');
db.getCollection('courses').find({})
