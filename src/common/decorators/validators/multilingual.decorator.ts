import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * 验证一个字段是否是有效的多语言对象，包含 default、en、zh_CN 属性
 * 
 * 使用示例:
 * ```typescript
 * export class ExampleDto {
 *   @IsMultilingual()
 *   name: {
 *     default: string;
 *     en: string;
 *     zh_CN: string;
 *   };
 * }
 * ```
 */
export function IsMultilingual(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMultilingual',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            value !== null &&
            typeof value === 'object' &&
            typeof value.default === 'string' &&
            typeof value.en === 'string' &&
            typeof value.zh_CN === 'string'
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 字段必须是有效的多语言对象，包含 default、en、zh_CN 三个属性，且均为字符串类型`;
        }
      }
    });
  };
} 