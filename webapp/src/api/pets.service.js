import { db, storage } from "../db/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  addDoc,
  limit,
  getDocsFromServer,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const petsRef = collection(db, "lost_pets");

export const addPet = (pet) => {
  return addDoc(petsRef, {
    name: pet.name,
    breed: pet.breed,
    image: pet.image,
    when: pet.when,
  });
};

export const addImage = (image) => {
  const imageRef = ref(storage, `images/${image.name + v4()}`);
  return uploadBytes(imageRef, image).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};

let lastVisible;

export async function getFoundPets() {
  const querySnapshot = await getDocsFromServer(
    lastVisible
      ? query(petsRef, orderBy("when"), startAfter(lastVisible), limit(4))
      : query(petsRef, orderBy("when"), limit(4))
  );
  lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export async function getPetsById(id) {
  const snap = await getDoc(doc(db, "lost_pets", id));
  return { id: snap.id, ...snap.data() };
}
