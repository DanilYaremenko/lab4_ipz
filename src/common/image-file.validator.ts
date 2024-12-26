import { FileValidator } from '@nestjs/common';

export interface ImageFileValidatorOptions {
  allowedMimeTypes: string[];
}

export class ImageFileValidator extends FileValidator {
  private allowedMimeTypes: string[];

  constructor(options: ImageFileValidatorOptions) {
    super(options);
    this.allowedMimeTypes = options.allowedMimeTypes;
  }

  isValid(file?: Express.Multer.File): boolean {
    if (!file) return false;
    return this.allowedMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    return `File type is not supported. Allowed types are: ${this.allowedMimeTypes.join(', ')}`;
  }
}
