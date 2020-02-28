const db = require("../database/dbConfig");

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(log => {
      const [id] = log;
      return db("users")
        .where({ id })
        .first();
    });
}

// function findById(id) {
//   return db("users")
//     .where({ id })
//     .first();
// }

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

module.exports = {
  findBy,
  //   findById,
  add
};
