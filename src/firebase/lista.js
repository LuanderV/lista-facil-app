import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./config";

export const itemsCol = collection(db, "items");

export async function addItem(data) {
  await addDoc(itemsCol, data);
}

export async function getItemsUsuario(idUsuario) {
  const filtro = query(itemsCol, where("idUsuario", '==', idUsuario));
  const snapshot = await getDocs(filtro);
  const items = [];
  snapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
}

export async function deleteItem(id) {
  const itemDoc = doc(itemsCol, id);
  await deleteDoc(itemDoc);
}

export async function getItem(id) {
  const itemDoc = doc(itemsCol, id);
  const snapshot = await getDoc(itemDoc);
  return snapshot.data();
}

export async function updateItem(id, data) {
  const itemDoc = doc(itemsCol, id);
  await updateDoc(itemDoc, data);
}
