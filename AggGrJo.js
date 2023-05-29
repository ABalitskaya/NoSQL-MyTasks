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

// Посчитает кол-во документов в коллекции
use('lesson1');
db.getCollection('appUsers').countDocuments();

// Кол-во документов, подходящих под условие
use('lesson1');
db.getCollection('appUsers').find({
    name: "Ihor Chulinda"
}).count();

// вернет уникальные значения по полям
use('lesson1');
db.getCollection('appUsers').distinct("name");

use('lesson1');
db.getCollection('appUsers').distinct("occupation");

// Сумма лет, сгруппированная по occupation. похож на group by.
use('lesson1');
db.getCollection('appUsers').aggregate([
    {$match: {}}, // сюда пишем, над какими документами делаем группировку
    {$group: {_id: "$occupation", total: {$sum: "$age"}}},
    {$sort: {total: -1}}
]);

// среднее
use('lesson1');
db.getCollection('appUsers').aggregate([
    {$match: {}}, // сюда пишем, над какими документами делаем группировку
    {$group: {_id: "$occupation", averageAge: {$avg: "$age"}}},
    {$sort: {total: -1}}
]);

use("lesson1");
db.getCollection("appUsers").find({});

use("lesson1");
db.getCollection("appUsers").updateOne(
    {name: "Kristina"},
    {$set: {city: "Berlin"}}
);

use('lesson1');
db.createCollection('cities');
db.getCollection('cities').insertMany([
    {name: "Los Angeles"},
    {name: "Berlin"},
]);

// типа left join
// Для каждого города выведет массив жителей
use('lesson1');
db.getCollection('cities').aggregate([
    {
    $lookup: {
        from: "appUsers",
        localField: "name", 
        foreignField: "city",
        as: "citizens"
    },
}]);

use('lesson1');
db.getCollection('cities').find({})

use('lesson1');
db.createCollection('orders');
db.getCollection('orders').insertMany([
    {
        id: 1,
        customer: 'Olga',
        product: 'Apple',
        amount: 15.55,
        city: 'Berlin'
    },
    {
        id: 2,
        customer: 'Anna',
        product: 'Apple',
        amount: 10.05,
        city: 'Madrid'
    },
    {
        id: 3,
        customer: 'Olga',
        product: 'Kiwi',
        amount: 9.6,
        city: 'Berlin'
    },
    {
        id: 4,
        customer: 'Anton',
        product: 'Apple',
        amount: 20,
        city: 'Roma'
    },
    {
        id: 5,
        customer: 'Olga',
        product: 'Banana',
        amount: 8,
        city: 'Madrid'
    },
    {
        id: 6,
        customer: 'Petr',
        product: 'Orange',
        amount: 8.3,
        city: 'Paris'
    },
]);

// Сколько всего заказов
use('lesson1');
db.getCollection('orders').countDocuments();

// Сколько раз заказали Apple
use('lesson1');
db.getCollection('orders').find({
    product: 'Apple'
}).count();

// Сколько раз заказали Apple
use('lesson1')
db.orders.countDocuments({product:"Apple"})



use('lesson1');
db.getCollection('orders').updateMany(
    {},
    {$set:{price: 10}},
);

//Вывести все документы отсортированными по стоимости покупки -
//от самой недорогой до самой дорогой


use('lesson1')
db.getCollection("orders").find({}).sort({
    amount: 1,
});

// Удалить поле у всех пользователей
use('lesson1');
db.getCollection('orders').updateMany(
    {},
    {$unset: {price: 0}}
);

use('lesson1');
db.getCollection('orders').find({});


// Три самых дорогих покупки
use('lesson1');
db.getCollection("orders").find({}).sort({
    amount: -1,
}).limit(3);

// Найти сколько всего покупок было совершено в Берлине
use('lesson1')
db.orders.countDocuments({city:"Berlin"});

//Найти количество покупок яблок в городах Берлин и Мадрид
use('lesson1');
db.orders.find({
    $and: 
    [{product: "Apple"},
    {city: {$in: ["Berlin", "Madrid"]}}]
}).count();

// Найти сколько всего товаров было купленно каждым покупателем
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {}}, // сюда пишем, над какими документами делаем группировку
    {$group: {_id: "$customer", total: {$sum: "$amount"}}},
    {$sort: {total: -1}}
]);

// Найти сколько всего товаров было купленно в каждом городе
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {}},
    {$group: {_id: "$city", total: {$sum: "$amount"}}},
    {$sort: {total: -1}}
]);

//Найти сколько всего было куплено каждого товара
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {}}, 
    {$group: {_id: "$product", total: {$sum: "$amount"}}},
    {$sort: {total: -1}}
]);

//Сколько раз заказывался каждый товар
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {}}, 
    {$group: {_id: "$product", total: {$sum: 1}}},
    {$sort: {total: -1}}
]);

// Добавить всем документам свойство count со значением 0
use('lesson1');
db.getCollection('orders').updateMany(
    {},
    {$set:{count: 0}},
);

// Документам с id 1 и 3 задать значение count 3. 
//Документу с id 4 задать count 2. Всем документам увеличить count на 1

use('lesson1');
db.getCollection('orders').updateMany(
    {id: {$in: [1,3]}},
    {$set: {count: 3}},
);

use('lesson1');
db.getCollection('orders').updateOne(
    {id: 4},
    {$set: {count: 2}},
);

use("lesson1");
db.getCollection("orders").updateMany(
    {},
    {
    $inc: {count: 1}
});

use('lesson1');
db.getCollection('orders').find({});

//Найти сколько раз совершила покупки Ольга
use('lesson1');
db.getCollection('orders').find({
    customer: "Olga"
}).count();

//Найти общее количество проданных яблок
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {product: "Apple"}},
    {$group: {_id: "$product", total: {$sum: "$amount"}}},
]);

//Найти в каких городах совершала покупки Ольга
use('lesson1');
db.getCollection('orders').aggregate([
    {$match: {customer: "Olga"}},
    {$group: {
      _id: "$city"
    }}]
)



