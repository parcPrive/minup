import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

interface IFile {
  files: FileUpload[];
}
@Injectable()
export class FileService {
  async upload({ files }: IFile) {
    const storage = new Storage({
      keyFilename: 'minip.json',
      projectId: 'minip-380418',
    }).bucket('minip');

    const waitFiles = await Promise.all(files);

    // console.log(waitFiles.filename);
    const result: any = await Promise.all(
      waitFiles.map((el) => {
        return new Promise((resolver, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolver(`minip/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );

    return result;
  }
}
