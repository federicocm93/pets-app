import { storage } from "../db/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "../axiosConfig";

export const addPet = (pet) => {
  return axios.post("/api/pets", pet, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
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
  return axios.get(`/api/pets/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  });
}
