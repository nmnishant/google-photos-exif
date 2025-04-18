import { isNullOrUndefined } from './is-null-or-undefined';
import { doesFileSupportExif } from './does-file-support-exif';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

export async function doesFileHaveExifDate(filePath: string): Promise<boolean> {
  if (!doesFileSupportExif(filePath)) {
    return false;
  }

  console.log('doesFileHaveExifDate:::', filePath);

  try {
    const { stdout } = await execAsync(`exiftool -DateTimeOriginal -j "${filePath}"`);
    const exifData = JSON.parse(stdout)[0];

    console.log('readResult:::', exifData);
    return !isNullOrUndefined(exifData.DateTimeOriginal);
  } catch (err) {
    console.error('ExifTool error:', err.message);
    return false;
  }
}