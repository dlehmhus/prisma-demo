import FileStorage, { Upload } from "./FileStorage";
import { ReadStream, createWriteStream, unlinkSync } from "fs";
import shortid from "shortid";
import mkdirp from "mkdirp";
import { extname } from "path";
const uploadDir = "./uploads";

// Ensure upload directory exists
// mkdirp.sync(uploadDir);

export default class LocalFileStorage implements FileStorage {
  async storeUpload(stream: ReadStream, id: string): Promise<any> {
    const path = `${uploadDir}/${id}`;
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve(path))
        .on("error", reject)
    );
  }

  async addFile(upload: Upload, uploadId?: string) {
    const { createReadStream, filename, mimetype, encoding } = await upload;
    const id = uploadId
      ? uploadId
      : `${shortid.generate()}-${extname(filename)}`;
    const stream = createReadStream();
    const path = await this.storeUpload(stream, id);
    return { id, filename, mimetype, encoding, path };
  }

  async deleteFile(id: string) {
    unlinkSync(`${uploadDir}/${id}`);
  }
}
