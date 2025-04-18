import { exiftool } from 'exiftool-vendored';
import { isNullOrUndefined } from './is-null-or-undefined';
import { doesFileSupportExif } from './does-file-support-exif';
import { promises as fspromises } from "fs";
import { basename, join } from 'path';
const { unlink, copyFile } = fspromises;

export async function doesFileHaveExifDate(filePath: string): Promise<boolean> {
  if (!doesFileSupportExif(filePath)) {
    return false;
  }

  console.log('doesFileHaveExifDate:::', filePath);  

  const fileName = basename(filePath);
  const tempFilePath = join('./temp', fileName);

  await copyFile(
    filePath,
    tempFilePath
  );

  const readResult = await exiftool.read(tempFilePath);

  console.log('readResult:::', readResult)
  return !isNullOrUndefined(readResult.DateTimeOriginal);
}
