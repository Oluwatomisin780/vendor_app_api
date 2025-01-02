import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
  name: string;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext) {
    //get user role
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const payload = jwt.verify(
          token,
          process.env.JSON_SECRET,
        ) as JwtPayload;
        const user = await this.prismaService.user.findUnique({
          where: {
            id: payload.id,
          },
        });
        if (!user) return false;
        if (roles.includes(user.userType)) return true;
        return false;
      } catch (error) {
        return false;
      }
    }

    return true;
  }
}
