import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    async login(dto:LoginDto){

    }
}
