import { collection, getFirestore, getDocs, getDoc, doc, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import app from './init';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveData(collectionName) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    return data;
}

export async function retrieveDataById(collectionName, id) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function retrieveDataByField(collectionName, field, value) {
    const q = query(
        collection(firestore, collectionName),
        where(field, '==', value),
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}

export async function addData(collectionName, data,callback) {
    await addDoc(collection(firestore, collectionName), data)
        .then(() => {
           callback(true) ;
        })
        .catch((err) => {
            callback(false)
            // console.log(error)
        });
}

export async function updataData(collectionName, id, data, callback) {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data)
        .then(() => {
            callback(true);
        })
        .catch(() => {
            callback(false);
        });
}

export async function uploadFile(file, blogId) {
    // Generate a unique file name for the image using timestamp
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;

    // Build the storage path using blogId and the unique file name
    const storagePath = `blogs/${blogId}/images/${fileName}`;

    // Reference to the storage path
    const storageRef = ref(storage, storagePath);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const url = await getDownloadURL(storageRef);

    // Return the download URL
    return url;
}

// Dalam "@/lib/firebase/services"
export async function deleteData(collectionName, id) {

    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef).then(() => {
        return true
    }).catch(() => {
        return false
    })


}