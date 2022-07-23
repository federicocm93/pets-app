let foundList = [
  {
    id: 1,
    name: "Negro",
    breed: "Golden retriever",
    image: "https://t1.ea.ltmcdn.com/es/posts/1/6/2/10_curiosidades_del_golden_retriever_21261_600.jpg",
    when: "12/05/2022"
  },
  {
    id: 2,
    name: "Mora",
    breed: "Beagle",
    image: "https://okdiario.com/img/2022/05/10/beagle.jpg",
    when: "22/06/2022"
  },
  {
    id: 3,
    name: "Tito",
    breed: "Pitbull",
    image: "https://mascotafiel.com/wp-content/uploads/2014/03/pitbull-portada.jpg",
    when: "06/07/2022"
  },
  {
    id: 4,
    name: "Lala",
    breed: "Dogo argentino",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gez11MzStYNVGInwB3gI1-Q7rOH6hkV2rA&usqp=CAU",
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
