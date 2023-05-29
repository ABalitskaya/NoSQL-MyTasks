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

// 1. Создать БД travel_agency

// 2. Создать коллекцию travel_offers со свойствами _id, departure_city, destination_city, nights_count, price, orders_count, используя следующие данные:

// 1 Berlin Paris 7 1000 2
// 2 Madrid Paris 6 950 3
// 3 Berlin London 5 1100 1
// 4 Paris Lyon  9 1300 2
// 5 Paris Yerevan 6 980 2
// 6 London Paris 8 1330 3
// 7 Roma Lyon 7 1050 5

use('travel_agency');
db.getCollection('travel_offers').insertMany(
    [
        {
        _id: 1,
        departure_city: 'Berlin',
        destination_city: 'Paris',
        nights_count: 7,
        price: 1000,
        orders_count: 2
        },
        {
        _id: 2,
        departure_city: 'Madrid',
        destination_city: 'Paris',
        nights_count: 6,
        price: 950,
        orders_count: 3
        },
        {
        _id: 3,
        departure_city: 'Berlin',
        destination_city: 'London',
        nights_count: 5,
        price: 1100,
        orders_count: 1
        },
        {
        _id: 4,
        departure_city: 'Paris',
        destination_city: 'Lyon',
        nights_count: 9,
        price: 1300,
        orders_count: 2
        },
        {
        _id: 5,
        departure_city: 'Paris',
        destination_city: 'Yerevan',
        nights_count: 6,
        price: 980,
        orders_count: 2
        },
        {
        _id: 6,
        departure_city: 'London',
        destination_city: 'Paris',
        nights_count: 8,
        price: 1330,
        orders_count: 3
        },
        {
        _id: 7,
        departure_city: 'Roma',
        destination_city: 'Lyon',
        nights_count: 7,
        price: 1050,
        orders_count: 5
        }
    ]
)

// 3. Найти сколько всего предложений есть у агенства
use('travel_agency');
db.getCollection('travel_offers').countDocuments();


use('travel_agency');
db.getCollection('travel_offers').find();

// 4. Найти сколько есть предложений по поездке в Париж дешевле 1000
use('travel_agency');
db.getCollection('travel_offers').find({
    $and: [
        {destination_city: "Paris"},
        {price: {$lt: 1000}},
    ],
}).count();

// Укороченный вариант
use('travel_agency');
db.getCollection('travel_offers').find({
    
        destination_city: "Paris",
        price: {$lt: 1000},
}).count();

// 5. Найти сколько было куплено поездок из Берлина
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {departure_city: "Berlin"}}, 
    {$group: {_id: "$departure_city", total: {$sum: "$orders_count"}}},
]);

// 6. Найти количество предложений по поездкам из Берлин
db.travel_offers.countDocuments({ departure_city: 'Berlin' });

// 7. Вывести все предложения, отсортированными в порядке возрастания цены
use('travel_agency');
db.getCollection('travel_offers').find().sort({
    price: 1,
});

// 8. Найти сумму стоимости всех предложений по поездкам из Парижа
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {departure_city: "Paris"}}, 
    {$group: {_id: "$departure_city", total: {$sum: "$price"}}},
]);

// 9. Найти количество купленные поездок в Лион, Ереван, Лондон
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {destination_city: {$in: ['Yerevan', 'London', 'Lyon']}}}, 
    {$group: {_id: "$destination_city", total: {$sum: "$orders_count"}}},
])

// 10. Найти общее количество купленные поездок в Лион, Ереван, Лондон
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {destination_city: {$in: ['Yerevan', 'London', 'Lyon']}}}, 
    {$group: {_id: "destination_city", total: {$sum: "$orders_count"}}},
])

use('travel_agency');
db.getCollection('travel_offers').find();

// 11. Если купить все предложения по поездке в Лион, сколько всего ночей в сумме можно там провести
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {destination_city:'Lyon'}}, 
    {$group: {_id: "$destination_city", total: {$sum: "$nights_count"}}},
])

// 12. Найти сколько было продано поездок в каждый из предложенных городов
use('travel_agency');
db.getCollection('travel_offers').aggregate([
    {$match: {}}, 
    {$group: {_id: "$destination_city", total: {$sum: "$orders_count"}}},
])


