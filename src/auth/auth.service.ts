import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const { _id, email } = user;

    return this.jwtService.sign({ _id, email });
  }

  async validateUser(loginAuthDto: CreateUserDto): Promise<string> {
    const { email: loginEmail, password: loginPass } = loginAuthDto;
    const user = await this.userService.findOne(loginEmail);

    const { _id, email, password } = user;

    if (bcrypt.compareSync(loginPass, password)) {
      const token = this.jwtService.sign({ _id, email });
      return token;
    } else {
      throw new UnauthorizedException();
    }
  }
}
