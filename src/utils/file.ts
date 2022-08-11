import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); //verifying if the file exists
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
};
