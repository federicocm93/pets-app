import db from '../db/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";

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
