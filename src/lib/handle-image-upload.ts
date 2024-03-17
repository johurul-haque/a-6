import { SetStateActionType } from '@/types/set-state-action';
import axios from 'axios';
import { encryptUrl } from './encryption';

export async function handleImageUpload(
  image: File,
  setProgress: SetStateActionType<number>
) {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_CLOUDINARY_URI!,
    formData,
    {
      onUploadProgress: (ev) => {
        if (ev.progress) {
          setProgress(Math.round(ev.progress * 100));
        }
      },
    }
  );

  return encryptUrl(data.secure_url);
}
