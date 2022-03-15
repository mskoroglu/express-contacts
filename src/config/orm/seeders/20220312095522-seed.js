"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        login: "user1",
        passwordHash: bcrypt.hashSync("s3cret", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: "user2",
        passwordHash: bcrypt.hashSync("p4ss", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Contacts", [
      {
        firstName: "John",
        lastName: "Doe",
        company: "Acme",
        phone: "+905554443322",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        company: "Foo Inc.",
        phone: "+905559876543",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Richard",
        lastName: "Roe",
        company: "Bar Inc.",
        phone: "+905551119988",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contacts", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
