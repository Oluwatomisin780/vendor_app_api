import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export interface UserInterface {
  name: string;
  id: string;
  iat: number;
  expire: number;
}
export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
