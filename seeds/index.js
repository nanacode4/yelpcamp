const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10;
        const camp = new Campground({
            author : '65fae7a9d30c84c8156ddac5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'very good!!!   YelpCamp is a full-stack website project where users can create and review campgrounds. In order to review or create a campground, you must have an account. ',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images:[
                {
                  url: 'https://res.cloudinary.com/dhi840idq/image/upload/v1711819431/39YelpCamp/sgtwmrmqrdjxhzfikjc5.jpg',
                  filename: '39YelpCamp/sgtwmrmqrdjxhzfikjc5'
                },
                {
                  url: 'https://res.cloudinary.com/dhi840idq/image/upload/v1711913678/39YelpCamp/low5pvxqrk5nu2ableng.png',
                  filename: '39YelpCamp/low5pvxqrk5nu2ableng'
                }
              ]
              
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})