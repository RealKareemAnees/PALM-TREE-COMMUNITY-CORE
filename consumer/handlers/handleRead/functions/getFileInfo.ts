import * as fs from "fs/promises";
import * as path from "path";

async function getFileInfo(filepath: string) {
  try {
    const normalizedPath = path.normalize(filepath);

    const stats = await fs.stat(normalizedPath);

    console.log(
      `fileinfo: 
            basename: ${path.basename(normalizedPath)},
            size: ${stats.size},
            path: ${normalizedPath}`.yellow
    );

    return {
      filename: path.basename(normalizedPath),
      size: stats.size,
      normalizedFilePath: normalizedPath,
    };
  } catch (error) {
    throw new Error(error);
  }
}

export { getFileInfo };
