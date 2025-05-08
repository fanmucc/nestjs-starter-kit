import { Reflector } from '@nestjs/core';

export const TRANSLATABLE_FIELD_KEY = 'translatable-field';

export function TranslatableField(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(TRANSLATABLE_FIELD_KEY, true, target, propertyKey);
  };
} 