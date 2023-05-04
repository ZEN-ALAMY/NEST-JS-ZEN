import { Body, Controller , Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        return this.usersService.create(body)
    }

    @Get('/:id')
    findOne(@Param('id') id:string){
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    find(@Query('email') email:string){
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
