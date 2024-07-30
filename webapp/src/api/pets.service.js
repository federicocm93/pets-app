import { db, storage } from "../db/firebase";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "../axiosConfig";

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

export async function getFoundPets(skip, limit) {
  return axios.get(`/api/pets?skip=${skip}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });
}

export async function getPetsById(id) {
  const snap = await getDoc(doc(db, "lost_pets", id));
  return { id: snap.id, ...snap.data() };
}
