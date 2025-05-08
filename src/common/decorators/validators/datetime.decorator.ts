import { Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import dayjs from 'dayjs';

/**
 * @DateTime 装饰器：将字符串转换为 Date 类型并验证格式
 * @param validationOptions 自定义错误提示
 */
export function DateTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    // 转换
    Transform(({ value }) => {
      const date = dayjs(value, 'YYYY-MM-DD HH:mm:ss', true);
      return date.isValid() ? date.toDate() : null;
    })(object, propertyName);

    // 校验
    registerDecorator({
      name: 'DateTime',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Date && !isNaN(value.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 时间格式无效，应为 YYYY-MM-DD HH:mm:ss`;
        },
      },
    });
  };
}