import { Expose } from 'class-transformer';

export class MultilingualName {
  @Expose()
  default: string;

  @Expose()
  en: string;

  @Expose()
  zh_CN: string;
}