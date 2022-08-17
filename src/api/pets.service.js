import db from '../db/firebase';
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

export const addPet = (pet) => {
  try {
    addDoc(collection(db, "lost_pets"), {
      name: pet.name,
      breed: pet.breed,
      image: pet.image,
      when: pet.when
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function getPets() {
  const querySnapshot = await getDocs(collection(db, "lost_pets"));
  return querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
};

export async function getPetsById (id) {
  const querySnapshot = await getDocs(query(collection(db, "lost_pets"), where("id", "==", id)));
  return querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  })[0];
};

