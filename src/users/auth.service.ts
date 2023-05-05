import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes , scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
     constructor(private userServices : UsersService){}

     async signup(email:string,password:string){
        const users = await this.userServices.find(email)
        if(users.length)
            throw new BadRequestException("Email is already taken")
        
        const salt=randomBytes(8).toString('hex')

        const hash = (await scrypt(password, salt ,32)) as Buffer;

        const result = salt + '.' + hash.toString('hex')

        const user = this.userServices.create(email,result)

        return user;
     }

     async signin(email:string,password:string){
        const [user] = await this.userServices.find(email);
        if(!user)
            throw new NotFoundException('User not found')
        else
        {
            const [salt,storedHash] = user.password.split('.');

            const hash = (await scrypt(password , salt , 32)) as Buffer;

            if(hash.toString('hex') !== storedHash)
                throw new BadRequestException('bad password')
            return user;
        }
     }
}