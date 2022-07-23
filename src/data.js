let foundList = [
  {
    id: 1,
    name: "Negro",
    breed: "Golden retriever",
    when: "12/05/2022"
  },
  {
    id: 2,
    name: "Mora",
    breed: "Beagle",
    when: "22/06/2022"
  },
  {
    id: 3,
    name: "Tito",
    breed: "Pitbull",
    when: "06/07/2022"
  },
  {
    id: 4,
    name: "Lala",
    breed: "Dogo argentino",
    when: "27/04/2022"
  }
];

export function getFoundList () {
  return foundList;
}

export function getFound(id) {
  return foundList.find(
    (found) => found.id === id
  );
}
