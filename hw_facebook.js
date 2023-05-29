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

use('facebook');
db.getCollection('users').insertMany(
    [
        {
            firstName: 'Ilia',
            lastName: 'Iashvili',
            email : 'ilia@gmail.com',
            password: '129IliaIa!_Ge',
            phone: '+995577654821',
            photo: 'url_1',
            address: {
                country: 'Georgia',
                city: 'Tbilisi'
            },
            friends: [1, 455, 789, 23, 44, 1845, 987],

        },
        {
            firstName: 'Tamar',
            lastName: 'Dundua',
            email : 'tamar@gmail.com',
            password: 'ofjfg_334G',
            phone: '+995599765410',
            photo: 'url_2',
            address: {
                country: 'Georgia',
                city: 'Kutaisi'
            },
            friends: [55, 77, 45, 888, 201],

        },
        {
            firstName: 'Revaz',
            lastName: 'Japaridze',
            email : 'revaz@gmail.com',
            password: 'kjhds65!ssSd',
            phone: '+995595879900',
            photo: 'url_3',
            address: {
                country: 'Georgia',
                city: 'Zugdidi'
            },
            friends: [3,5,111,6534],

        },
        {
            firstName: 'Temuri',
            lastName: 'Getsadze',
            email : 'temo@gmail.com',
            password: 'kf87Hhhhfdh091',
            phone: '+995599885564',
            photo: 'url_4',
            address: {
                country: 'Georgia',
                city: 'Borjomi'
            },
            friends: [3,5,111,6534],
        }
    ]
);

use('facebook');
db.getCollection('posts').insertMany([
    {
        user: 3,
        time: 'time',
        text: 'I am here',
        comments: [
            {
                user: 22,
                time: 'time',
                text: 'And what?'
            },
            {
                user: 201,
                time: 'time',
                text: 'Who are you?'
            }    
        ],
        likes: [5,4,7,8,3,2]
    },
    {
        user: 35,
        time: 'time',
        text: 'My cat is crazy',
        comments: [
            {
                user: 4,
                time: 'time',
                text: 'It is funny'
            },
            {
                user: 5,
                time: 'time',
                text: 'hahaha?'
            }    
        ],
        likes: [88,24,57,665,234]
    },
    {
        user: 234,
        time: 'time',
        text: 'I was in mountains',
        comments: [
            {
                user: 267,
                time: 'time',
                text: 'Beautiful'
            },
            {
                user: 9,
                time: 'time',
                text: 'Super'
            },
            {
                user: 55,
                time: 'time',
                text: 'Where is it?'
            }     
        ],
        likes: [1, 5]
    },
    {
        user: 14,
        time: 'time',
        text: 'Lalalalalalalala'
    },
    {
        user: 14,
        time: 'time',
        text: 'Vaime ra lamazi gogoa',
        comments: [
            {
                user: 63,
                time: 'time',
                text: 'Es chemi daa! Shen vin har???'
            }   
        ],
        likes: [98, 34]
    }
]);

use ('facebook');
db.getCollection('groups').insertMany([
    {
        name: 'Ski touring in Alps',
        description: 'This group is about ...blablabla for people who...',
        image: 'url_123',
        admins: [1,55,8],
        users: [4,446,3536,77,342,254,6,69],
        posts: [5,8,6,1,11,123]
    },
    {
        name: 'Funny dogs',
        description: 'Our funny dogs. Photo and vodeo',
        image: 'url_403',
        admins: [99,23,7],
        users: [056, 7845, 93845, 2],
        posts: [4556, 8659, 90, 560]
    },
    {
        name: 'The best jokes',
        description: 'Hahahaha',
        image: 'url_23',
        admins: [10,2,3],
        users: [545, 6723, 8, 45, 134],
        posts: [9, 6,  784]
    },
    {
        name: 'Books for kids',
        description: 'Library',
        image: 'url_12',
        admins: [77, 78, 79],
        users: [5, 754, 9786, 666],
        posts: [6, 66, 666, 6666]
    }
]);

use('facebook');
db.getCollection('profile').insertMany([
    {
        user: 8,
        photos: [
            {
                nameofAlbom: 'Me',
                photos: ['url_33', 'url_77', 'url_9']
            },
            {
                nameofAlbom: 'NY',
                photos: ['url_4', 'url_67', 'url_200','url_100', 'url_634', 'url_900']
            }

        ],
        videos: ['url_33', 'url_333', 'url_3333'],
        usersInfo: {
            birthDay: Date,
            hometown: "Kharkov",
            school: "11",
            university: "ХАИ" 
        },
        married: true
    },
    {
        user: 3425,
        photos: [
            {
                nameofAlbom: 'My Family',
                photos: ['url_546', 'url_867', 'url_985']
            },
            {
                nameofAlbom: 'Summer 2022',
                photos: ['url_342', 'url_64245', 'url_633333','url_164520', 'url_2224', 'url_7700']
            }

        ],
        videos: ['url_33333223', 'url_335163', 'url_35462333'],
        usersInfo: {
            birthDay: Date,
            hometown: "Batumi",
            school: "13",
        },
        married: false
    }
])

use('facebook');
db.getCollection("users").find({});