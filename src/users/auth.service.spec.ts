import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

it('can create an instance of auth service',async ()=>{
    
    const fakeusersService = {
        find:()=>Promise.resolve([]),
        create: (email:string,password:string) => Promise.resolve({id:1,email:"zen@alamy.com",password:'123456'}),
    }
    
    const module = await Test.createTestingModule({
        providers:[AuthService,
            { 
                provide:UsersService,
                useValue:fakeusersService
            }
            ]
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
})