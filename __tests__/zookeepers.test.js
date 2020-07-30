const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require("../lib/zookeepers.js");
const { zookeepers } = require('../data/zookeepers');
jest.mock("fs");


test("create a new zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Louis", id: "siuol" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Louis");
  expect(zookeeper.id).toBe("siuol");
});


test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Cooper",
      age: 18,
      favoriteAnimal: "penguin"
    },
    {
      id: "1",
      name: "Baasha",
      age: 75,
      favoriteAnimal: "bear"
    },
  ];

  const updatedZookeepers = filterByQuery({ favoriteAnimal: "bear" }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});



test("find zookeeper by id", () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Cooper",
      age: 18,
      favoriteAnimal: "penguin"
    },
    {
      id: "1",
      name: "Baasha",
      age: 75,
      favoriteAnimal: "bear"
    },
  ]

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Cooper");
});


test("validates favorite animal", () => {
  const zookeeper = 
    {
      id: "1",
      name: "Baasha",
      age: 75,
      favoriteAnimal: "bear"
    };

    const invalidZookeeper = {
      id: "3",
      name: "Cooper",
      age: 18,
      favoriteAnimal: 7
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});