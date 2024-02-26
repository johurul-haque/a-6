export async function saveToCloudinary(image: File) {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

  const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URI!, {
    method: 'POST',
    body: formData,
  });

  return res.json();
}
