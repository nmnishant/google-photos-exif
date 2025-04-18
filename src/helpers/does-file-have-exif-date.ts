import { exiftool } from 'exiftool-vendored';
import { isNullOrUndefined } from './is-null-or-undefined';
import { doesFileSupportExif } from './does-file-support-exif'

export async function doesFileHaveExifDate(filePath: string): Promise<boolean> {
  if (!doesFileSupportExif(filePath)) {
    return false;
  }

  console.log('doesFileHaveExifDate:::', filePath);  

  const readResult = await exiftool.read(filePath);

  console.log('readResult:::', readResult)
  return !isNullOrUndefined(readResult.DateTimeOriginal);
}
