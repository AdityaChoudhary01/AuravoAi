
'use server';

import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAvatar(formData: FormData): Promise<{ photoURL: string | null }> {
  const avatarFile = formData.get('avatar') as File | null;
  
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

    return { photoURL: uploadResult.secure_url };
  }

  return { photoURL: null };
}
