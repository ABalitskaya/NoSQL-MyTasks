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

use("lesson1");
db.getCollection("appUsers").insertMany([
    {
        name: "Ihor Chulinda",
        occupation: "teacher",
    },
    {
        name: "Alexandra Balitskaya",
        occupation: "student",
    },
])

use("lesson1");
db.getCollection("appUsers").find({name: "Sasha Balitskaya"});

use("lesson1");
db.getCollection("appUsers").find({});

use("lesson1");
db.getCollection("appUsers").deleteMany({name: "Ihor Chulinda"});

// Удалить коллекцию
db.users.drop();


// >
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $gt: 35
    }
});

//>=
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $gte: 35
    }
});

//<
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $lt: 35
    }
});

//<=
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $lte: 35
    }
});

//IN
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $in: [18, 35, 89],
    },
});


// Комбинация условий - выведет всех
use("lesson1");
db.getCollection("appUsers").find({
    age: {
        $lt: 60,
        $gt: 18,
    },
});

// чтоб выполнились все условия
use("lesson1");
db.getCollection("appUsers").find({
    $and: [
        {age: {$lt: 60,}},
        {age: {$gt: 18,}},
        {occupation: {$in: ["student", "teacher"]}}  
    ],
});

// хотя бы одно условие:
use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {age: {$lt: 60,}},
        {age: {$gt: 18,}},
        {occupation: {$in: ["student", "teacher"]}}  
    ],
});

// все условия должны быть НЕ выполнены:
use("lesson1");
db.getCollection("appUsers").find({
    $nor: [
        {age: {$lt: 60,}},
        {age: {$gt: 18,}},
        {occupation: {$in: ["student", "teacher"]}}  
    ],
});

// Это условие не выполняется (только одно условие)
use("lesson1");
db.getCollection("appUsers").find({
    age: {$not: 60},
});

use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {
            $and:[
                {age: {$lt: 60,}},
                {age: {$gt: 18,}},
            ]
    },
    {
        occupation: {$in: ["teacher"]},
    }
],
});

// Лимит: ограничить двумя документами
use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {
            $and:[
                {age: {$lt: 60,}},
                {age: {$gt: 18,}},
            ]
    },
    {
        occupation: {$in: ["teacher"]},
    }
],
}).limit(2);

// Пропустить первые документы
use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {
            $and:[
                {age: {$lt: 60,}},
                {age: {$gt: 18,}},
            ]
    },
    {
        occupation: {$in: ["teacher"]},
    }
],
}).skip(3);

// Пропустить первые два документа и отобразить следующие два.
use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {
            $and:[{age: {$lt: 60,}},{age: {$gt: 18,}},]
    },
    {
        occupation: {$in: ["teacher"]},
    }
],
}).skip(2).limit(2);


use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {age: {$gt: 60,}},
        {occupation: {$in: ["student"]}}  
    ],
}).limit(1);

use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {age: {$gt: 60,}},
        {occupation: {$in: ["student"]}}  
    ],
}).skip(1).limit(1);

use("lesson1");
db.getCollection("appUsers").find({
    $or: [
        {age: {$gt: 60,}},
        {occupation: {$in: ["student"]}}  
    ],
}).skip(2).limit(1);

use("lesson1");
db.getCollection("appUsers").find({}).sort({
    age: 1, //-1 По возрастанию или убыванию
});

use("lesson1");
db.getCollection("appUsers").deleteMany({});


use("lesson1");
db.getCollection("appUsers").insertMany([
    {
        name: "Kristina",
        occupation: "student",
        age: 18,
        languages: ["en", "ru", "ge", "pl"]
    },
    {
        name: "Dmitrii",
        occupation: "student",
        age: 60,
        languages: ["en", "ru", "ge", "ua"]
    },
    {
        name: "Ilya",
        occupation: "student",
        age: 35,
        languages: ["ru", "ge", "de"]
    },
    {
        name: "Alisa",
        occupation: "student",
        age: 9,
        languages: ["en", "fr", "ge", "ua"]
    },
    {
        name: "Anton",
        occupation: "student",
        age: 100,
        languages: ["am", "ru", "ge", "en"]
    },
    {
        name: "Kote",
        occupation: "teacher",
        age: 44,
        languages: ["en"]
    },
    {
        name: "Sofi",
        occupation: "student",
        age: 10,
        languages: ["ru"]
    },
    {
        name: "Kato",
        occupation: "teacher",
        age: 78,
        languages: ["ru", "ge"]
    },

]);

// Вернет только по первому элементу массива языков
use("lesson1");
db.getCollection("appUsers").find({}, {
    languages: {$slice: 1}
});

use("lesson1");
db.getCollection("appUsers").find({}, {
    languages: {$slice: [2,1]} // Первая цифра - сколько скипнуть, вторая цифра - лимит
});

// Вернет предпоследний элемент
use("lesson1");
db.getCollection("appUsers").find({}, {
    languages: {$slice: [-1,1]} // Первая цифра - сколько скипнуть с конца, вторая цифра - лимит
});

// Обновление данных

//replace - перезаписывает все содержимое на содержане второго аргумента
use("lesson1");
db.getCollection("appUsers").replaceOne(
    {name: "Alisa"},
    {name: "Aliska"}
);

//Update One - добавляет объекту данные
use("lesson1");
db.getCollection("appUsers").updateOne(
    {name: "Aliska"},
    {$set: {
        age: 9,
        occupation: "student",
        languages: ["en", "ru", "ch", "ge"]
    }}
);

use("lesson1");
db.getCollection("appUsers").updateOne(
    {name: "Aliska"},
    {$set: {name: "Alisa"}}
);

// Update Many - обновит все подходящие документы
use("lesson1");
db.getCollection("appUsers").updateMany(
    {name: "Alisa"},
    {$set: {name: "Aliska"}}
);

use("lesson1");
db.getCollection("appUsers").find({
    name: "Aliska",
});

//Найти по id
use("lesson1");
db.getCollection("appUsers").find({
    _id: ObjectId('643d6eb117c542b9ee7529c6'),
});

// Всем пользователям выставить свойство - city

use("lesson1");
db.getCollection("appUsers").updateMany(
    {},
    { $set: {city: "Los Angeles"}}
);

// Все, кто старше 60 - переезжают жить в Цюрих
use("lesson1");
db.getCollection("appUsers").updateMany(
    {age: {$gt: 60}},
    { $set: {city: "Zurich"}}
);

// Пользователям старше 25 и младше 60 добавить зарплату 3000
use("lesson1");
db.getCollection("appUsers").updateMany(
    {
        $and: [
            {age: {$gt: 25}},
            {age: {$lt: 60}}
        ]
    },
    {
        $set: {salary: 3000}
    }
);

// Обновление числовых данных
// Увеличить возраст на 1. Инкремент на 1 увеличит возвраст на 1 или отсутствующий возраст на 1
use("lesson1");
db.getCollection("appUsers").updateMany(
    {
        age: {$gt: 0}
},
    {
    $inc: {age: 1}
});

// Всем, у кого есть зарплата, увеличить ее на 1000
use("lesson1");
db.getCollection("appUsers").updateMany(
    {
        salary: {$gte: 0}
    },
    {
        $inc: {salary: 1000}
    }
)

// Unset - убирает поля
// уберет всем поля возраста, у кого возраст = 1
use("lesson1");
db.getCollection("appUsers").updateMany(
    {age: 1},
    {$unset: {age: 1}}
);

//Модификация массивов
// Push. Всем пользователям добавить знание итальянского
use("lesson1");
db.getCollection("appUsers").updateMany({},
    {
        $push: {languages: "it"}
    });


// $each - работает вместе с push и добавляет сразу несколько значений
use("lesson1");
db.getCollection("appUsers").updateMany({},
    {
        $push: {languages: {$each: ["jp", "ch", "ro"]}}
    });

// pull - удаляет все значения из массива
use("lesson1");
db.getCollection("appUsers").updateMany({},
    {
        $pull: {languages:"it"}
    });
    
// pullAll: удалит сразу много значений из массива
use("lesson1");
db.getCollection("appUsers").updateMany({},
    {
        $pullAll: {languages:["jp", "ch", "ro"]}
    });
        
