const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 5000;

const generateAdvisors = (count) => {
    const advisors = [];

    for (let i = 0; i < count; i++) {
        const advisor = {
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            status: faker.datatype.boolean() ? 'Online' : 'Offline',
            languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'German'], faker.datatype.number({ min: 1, max: 4 })),
            reviews: faker.datatype.number({ min: 0, max: 100 }),
        };

        advisors.push(advisor);
    }
    console.log(JSON.stringify(advisors, null, 2)); // Вывод фейковых данных в консоль
    return advisors;
};

app.get('/api/advisors', (req, res) => {
    const advisors = generateAdvisors(20); // Генерация 20 советников (вы можете настроить количество)

    res.json(advisors);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
