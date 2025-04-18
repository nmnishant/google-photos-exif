import { exiftool } from 'exiftool-vendored';
import { isNullOrUndefined } from './is-null-or-undefined';
import { doesFileSupportExif } from './does-file-support-exif';
import { promises as fspromises } from "fs";
import { basename, join, resolve } from 'path';
const { unlink, copyFile } = fspromises;

export async function doesFileHaveExifDate(filePath: string): Promise<boolean> {
  if (!doesFileSupportExif(filePath)) {
    return false;
  }

  console.log('doesFileHaveExifDate:::', filePath);  


  const newfilePath = resolve('/data/data/com.termux/files/home/temp', basename(filePath));
  console.log({newfilePath});
  const readResult = await exiftool.read(newfilePath);

  console.log('readResult:::', readResult)
  return !isNullOrUndefined(readResult.DateTimeOriginal);
}
