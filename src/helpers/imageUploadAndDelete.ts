import { firebaseApp } from "@/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImages = async (images: File[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, ``);

    const urlss : any = [];
    const imagesUploadResponses : any = await Promise.all(
      
      
      // images.map((image) => uploadBytes(storageRef, image))


      images.map(async (file) => {
        // folder and image name to save image it  --> products/121212
        const imageRef = ref(storage, `images/${uuidv4()}`);
        // send image to firebase/storage
        const res = await uploadBytes(imageRef, file);

        // retrive image from firebase/storage
        const url = await getDownloadURL(res.ref);

        //// then add image Link to array
        urlss.push(url);
      })



    );

    // const urls = await Promise.all(
    //   imagesUploadResponses.map((imageUploadResponse) => {
    //     return getDownloadURL(imageUploadResponse.ref);
    //   })
    // );



    return urlss;
  } catch (error) {
    throw error;
  }
};

export const deleteImages = async (images: string[]) => {
  try {
    const storage = getStorage(firebaseApp);
    const deleteResponses = await Promise.all(
      images.map((image) => deleteObject(ref(storage, image)))
    );
    return deleteResponses;
  } catch (error) {
    throw error;
  }
};
