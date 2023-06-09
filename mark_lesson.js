/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'lesson1';
const collection = 'NEW_COLLECTION_NAME';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

use("eats");
// db.dropDatabase();
// users
const user = {
  name: "Mark",
  savedAddress: [
    {
      title: "Home",
      address: {
        long: 21.12345,
        lat: 11.7895,
        label: "Pushkin street",
      },
    },
  ],
  email: "example@mail.ru",
  phone: "+995789456123",
};
// products
const product = {
restId: 1,
title: "Apple",
weight: 100,
price: 5.85,
category: ["vegan"],
image: "https://placeholder.com/",
  // deleted: true
};
// restaurants
const restaurant = {
name: "Crusty crabs",
phone: "+995789456123",
address: {
    long: 21.12345,
    lat: 11.7895,
    label: "Pushkin street",
},
foodStyle: ["asia", "europe"],
rating: 5.0,
};
// couriers
const courier = {
  name: "Alex",
  phone: "+7747458489",
  image: "",
  rating: 5.0,
  vehicle: "car",
  currentCoordinates: {
    long: 21.1234,
    lat: 11.7854,
},
};

// orders
const order = {
userId: "",
restId: "",
courierId: "",
address: {
    long: 21.12345,
    lat: 11.7895,
    label: "Pushkin street",
},
products: [
    {
    productId: 1,
    amount: 1,
    },
],
totalPrice: 100,
notesForRest: "",
notesForCourier: "",
  paymentType: "cash", // card
paid: true,
  status: "pending", // 'pending', 'cooking', 'delivery', 'completed', 'cancelled'
};

// Creation
// Register user
db.users.insertOne({
...user,
_id: 1,
});
// Register rest
db.restaurants.insertOne({
...restaurant,
_id: 1,
});

// Add product
db.products.insertMany([
{
    ...product,
    _id: 1,
    title: "Apple",
},
{
    ...product,
    _id: 2,
    title: "Banana",
},
{
    ...product,
    _id: 3,
    title: "Strawberry",
},
]);

db.couriers.insertOne({
...courier,
_id: 1,
});

db.orders.insertOne({
...order,
_id: 1,
courierId: 1,
restId: 1,
userId: 1,
});

const orderedProductIds = [1, 2];
db.products.countDocuments({
restId: 1,
_id: { $in: orderedProductIds },
});

use("eats");
const orderedProducts = [
{
    productId: 1,
    amount: 1,
},
{
    productId: 2,
    amount: 2,
},
];
db.products.aggregate([
{
    $project: {
    price: 1,
    },
},
{
    $lookup: {
    localField: "_id",
    foreignField: "productId",
    as: "order",
    pipeline: [
        {
        $documents: orderedProducts,
        },
    ],
    },
},
{
    $unwind: {
    path: "$order",
    },
},
{
    $group: {
    _id: "",
    totalPrice: {
        $sum: { $multiply: ["$price", "$order.amount"] },
    },
    },
},
]);

// получить продукты по id и получить только цену и id
db.products.find(
{
    restId: 1,
    _id: { $in: [1, 2] },
},
{ price: 1 }
);




