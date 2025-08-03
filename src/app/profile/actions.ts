
'use server';

import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function updateUserProfile(formData: FormData) {
  const name = formData.get('name') as string;
  const avatarFile = formData.get('avatar') as File | null;

  const user = auth.currentUser;

  if (!user) {
    // This check is now primarily a safeguard. 
    // The main check should happen on the client before calling this action.
    throw new Error('You must be logged in to update your profile.');
  }

  let photoURL = user.photoURL;

  if (avatarFile && avatarFile.size > 0) {
    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }).end(buffer);
    }) as { secure_url: string };

    photoURL = uploadResult.secure_url;
  }
  
  await updateProfile(user, {
    displayName: name,
    photoURL: photoURL,
  });
}
