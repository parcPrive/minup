import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}
  @Mutation(() => [String])
  async uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    const file = await this.fileService.upload({ files });

    return file;
  }
}
