import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; // Extract the token (e.g., "Bearer <token>")
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: decoded.id, email: decoded.email } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}