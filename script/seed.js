"use strict";


const {db, models: { Project, List, Task, User } } = require('../server/db')


const usersData = [
  {username: 'tony', password: '1234', email: 'tony@gmail.com', address: '9 zoom dr', isAdmin: true},
  {username: 'ethan', password: '1234', email: 'ethan@gmail.com', address: '8 zoom ave', isAdmin: true},
  {username: 'jeff', password: '1234', email: 'jeff@gmail.com', address: '10 zoom blvd', isAdmin: true},
  {username: 'mike', password: '1234', email: 'mike@gmail.com', address: '5 zoom rd', isAdmin: true},
  {username: 'alice', password: '1234', email: 'alice@gmail.com', address: 'zoom place', isAdmin: false},
  {username: 'mary', password: '1234', email: 'mary@gmail.com', address: 'zoom lane', isAdmin: false}]

  const projectsData = [
    {boardName: 'Capstone'},
    {boardName: 'Grace Shopper'},
    {boardName: 'Fullstack Project'},
    {boardName: 'Meow Meow Kitties'},
  ]

  const listsData = [
    {columnName: 'Start'},
    {columnName: 'In progress'},
    {columnName: 'Final'}
  ]

  const tasksData = [
    {taskName: 'Seed database', Notes: '', isComplete: false, imageUrl: '', requiresApproval: true},
    {taskName: '', Notes: '', isComplete: false, imageUrl: '', requiresApproval: true},,
    {}
  ]
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  await Promise.all([
    usersData.forEach((user) => {
      User.create(user)
    })
  ])
  const user1 = await User.create({username: 'admin1', password: '1234', email: 'admin1@gmail.com', address: '1 zoom dr', isAdmin: true});
  const user2 = await User.create({username: 'user1', password: '1234', email: 'user1@gmail.com', address: '2 zoom dr', isAdmin: false});

  const list1 = await List.create({columnName: 'Alpha'});
  const list2 = await List.create({columnName: 'Beta'});
  const list3 = await List.create({columnName: 'Gamma'});
  const list4 = await List.create({columnName: 'Alpha'});

  const task1 = await Task.create({taskName: 'Create title', Notes: 'Come up with title for project', isComplete: false, imageUrl: '', requiresApproval: true});
  const task2 = await Task.create({taskName: 'Touch button', Notes: 'hello', isComplete: true, imageUrl: '', requiresApproval: true});
  const task3 = await Task.create({taskName: 'Turn page', Notes: 'Page turn', isComplete: false, imageUrl: '', requiresApproval: false});
  const task4 = await Task.create({taskName: 'Type key', Notes: 'Hit the key button', isComplete: true, imageUrl: '', requiresApproval: false});

  await list1.setTasks([task1, task2])
  await list2.setTasks([task3, task4])
  await user1.setLists([list1, list2])
  await user2.setLists([list1, list2, list3])


  // console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      user1, user2
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
