import { ReadStream } from "fs";

export type Upload = {
  createReadStream: () => ReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
};

type File = {
  id: string;
  filename: string;
  mimetype: string;
  encoding: string;
  path: string;
};
export default interface FileStorage {
  storeUpload(stream: ReadStream, filename: string): Promise<string>;
  addFile(upload: Upload): Promise<File>;
  deleteFile(id: string): Promise<any>;
}
