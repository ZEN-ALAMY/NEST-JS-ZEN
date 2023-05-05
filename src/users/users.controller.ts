import { Body, Controller , Delete, Get, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { AuthService } from './auth.service';
import { CurretnUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private usersService:UsersService , private authServices:AuthService){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto , @Session() session:any){
        const user = await  this.authServices.signup(body.email,body.password)
        session.userId = user.id;
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('whoami')
    whoAmI(@CurretnUser() user:User){
        return user;
    }

    @Post('signout')
    signOut(@Session() session:any){
        session.userId=null;
    }
    @Post('signin')
    async signIn(@Body() body:CreateUserDto , @Session() session:any){
        const user = await this.authServices.signin(body.email,body.password)
        session.userId = user.id
        return user;
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    findAllUser(@Query('email') email:string){
        return this.usersService.find(email)
    }

    @Patch('/:id')
    update(@Param('id') id:string , @Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id),body)
    }

    @Delete('/:id')
    remove(@Param('id') id:string){
        return this.usersService.remove(parseInt(id))
    }

}
