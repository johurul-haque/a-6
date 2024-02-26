export async function saveToCloudinary(image: File) {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('upload_preset', process.env.UPLOAD_PRESET!);

  const res = await fetch(process.env.CLOUDINARY_URI!, {
    method: 'POST',
    body: formData,
  });

  return res.json();
}
