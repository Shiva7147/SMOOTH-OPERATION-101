import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

/**
 * Uploads a profile review file (image/screenshot) to Firebase Storage
 * Path: reviews/{userId}/{timestamp}_{filename}
 */
export async function uploadReviewFile(
  userId: string,
  file: File
): Promise<string> {
  try {
    const timestamp = Date.now();
    // Normalize filename by removing spaces/special characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storageRef = ref(
      storage,
      `reviews/${userId}/${timestamp}_${cleanFileName}`
    );
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading review file:', error);
    throw error;
  }
}

/**
 * Uploads a reviewer's voice note to Firebase Storage
 * Path: voicenotes/{reviewerId}/{timestamp}_{filename}
 */
export async function uploadVoiceNote(
  reviewerId: string,
  file: File
): Promise<string> {
  try {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storageRef = ref(
      storage,
      `voicenotes/${reviewerId}/${timestamp}_${cleanFileName}`
    );
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading voice note:', error);
    throw error;
  }
}
