import { exiftool } from "exiftool-vendored";
import { doesFileSupportExif } from "./does-file-support-exif";
import { promises as fspromises } from "fs";
import { MediaFileInfo } from "../models/media-file-info";
import { resolve } from "path";

const { unlink, copyFile } = fspromises;

export async function updateExifMetadata(
  fileInfo: MediaFileInfo,
  timeTaken: string,
  errorDir: string
): Promise<void> {
  if (!doesFileSupportExif(fileInfo.outputFilePath)) {
    console.log(`DOES NOT SUPPORT EXIF:::`);
    return;
  }

  try {
    await exiftool.write(fileInfo.outputFilePath, {
      DateTimeOriginal: timeTaken,
    });

    console.log(`WROTE DONE:::`);

    await unlink(`${fileInfo.outputFilePath}_original`); // exiftool will rename the old file to {filename}_original, we can delete that
  } catch (error) {
    console.log(`GOT ERROR:::`, error);

    await copyFile(
      fileInfo.outputFilePath,
      resolve(errorDir, fileInfo.mediaFileName)
    );
    if (
      fileInfo.jsonFileExists &&
      fileInfo.jsonFileName &&
      fileInfo.jsonFilePath
    ) {
      await copyFile(
        fileInfo.jsonFilePath,
        resolve(errorDir, fileInfo.jsonFileName)
      );
    }
  }
}
