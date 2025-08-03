
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

  // This check is problematic in server actions as auth.currentUser is often null.
  // The primary auth check is now done on the client before calling this action.
  // A more robust solution for server-side auth would involve session management
  // with cookies or tokens, but for this context, we rely on the client check.
  if (!user) {
    // We will proceed, as updateProfile below might still work if Firebase Auth context is carried over.
    // But we must handle the case where it fails.
  }

  let photoURL: string | null | undefined = user?.photoURL;

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
  
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
      });
    } catch (error) {
      console.error("Error updating profile in server action:", error);
      throw new Error("Failed to update profile on the server.");
    }
  } else {
    // This path should ideally not be hit if the client-side guard is working.
    throw new Error('You must be logged in to update your profile.');
  }
}
