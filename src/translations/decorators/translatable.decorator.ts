import { SetMetadata } from '@nestjs/common';

export const TRANSLATABLE_KEY = 'translatable';
export const Translatable = (table: string) => SetMetadata(TRANSLATABLE_KEY, table); 