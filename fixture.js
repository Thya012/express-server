require('dotenv').config();

const { faker } = require('@faker-js/faker');
const dbConnect = require('./src/db/db.js');
const CourseModel = require('./src/models/course.js');
const UserModel = require('./src/models/user.js');
const BookModel = require('./src/models/book.js');

dbConnect().catch((err) => {
    console.log(err);
});

const numberOfCourse = 100;
const numberOfUsers = 100;
const numberOfBooks = 100;

console.log(Date.now());

async function generate() {
    const usersList = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const newUser = new UserModel({
            username: faker.internet.userName(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),

            dateOfBirth: faker.date.birthdate(),
            email: faker.internet.email(),
        });
        const result = await newUser.save();
        usersList.push(result._id);
        console.log(`${i} - User with id: ${result._id} generated`);
    }

    for (let i = 0; i < numberOfCourse; i++) {
        const randomId = usersList[Math.floor(Math.random() * usersList.length)];

        const newCourse = new CourseModel({
            price: faker.commerce.price(),
            title: faker.lorem.sentence(5),
            category: faker.music.genre(),
            
            author: randomId,
        });
        const result = await newCourse.save();
        console.log(`${i} - Course with id: ${result._id} generated`);
    }


    for (let i = 0; i < numberOfBooks; i++) {
        const randomId = usersList[Math.floor(Math.random() * usersList.length)];
        const newBook = new BookModel({
            author: randomId,
            page: faker.number.int({ max: 500 }),
            description: faker.lorem.paragraph(),
            genre: faker.lorem.word(),
            title: faker.lorem.sentence({ min: 3, max: 5 }),
        });
        const result = await newBook.save();
        console.log(`${i} - Book with id: ${result._id} generated`);
    }
}
generate();