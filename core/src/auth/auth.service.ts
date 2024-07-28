import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  saltOrRounds: number = 10;

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user._id,
      username: username,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(signUpDto: SignUpDto) {
    const hashPass = await bcrypt.hash(signUpDto.password, this.saltOrRounds);

    const newUserPayload = {
      name: signUpDto.name,
      username: signUpDto.username,
      email: signUpDto.email,
      password: hashPass,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } =
      await this.usersService.create(newUserPayload);
    // Return new user without password;
    return result;
  }
}
