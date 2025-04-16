import { Exclude, Transform, Expose } from 'class-transformer'

export class ResponseAccountInfoDto {
  // @Exclude() 排除
  @Expose()
  @Transform(({ value }) => (typeof value === 'bigint' ? Number(value.toString()) : value))
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
