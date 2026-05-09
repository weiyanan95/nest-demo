import { Injectable } from '@nestjs/common';
import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';
import { MainService } from './main.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly mainService: MainService, private readonly prismaService: PrismaService) {}
  private users: User[] = [
    {
      id: 1,
      name: '张三',
      age: '20',
      email: 'zhangsan@example.com',
    },
    {
      id: 2,
      name: '李四',
      age: '28',
      email: 'lisi@example.com',
    },
    {
      id: 3,
      name: '王五',
      age: '35',
      email: 'wangwu@example.com',
    },
  ];//模拟数据库
  //具体的业务逻辑 调用第三方的api 数据库 数据转换
  getUser(): string {
    return 'This is the user service';
  }
  async addUser(createUserDto: CreateUserDto) {
   const user =  await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role ?? 'user',
      },
   });
   return {
    success: true,
    message: `用户${createUserDto.name}创建成功`,
    data: user,
   }  
  }
  // createUser(user: CreateUserDto) {
  //   // this.mainService.sendMail({
  //   //   to: user.email,
  //   //   subject: '欢迎注册',
  //   //   text: `您好,${user.email},欢迎注册我们的服务`,
  //   // });
  //   // 这里模拟创建用户,实际项目中会调用数据库
  //   return {
  //     success: true,
  //     message: `用户${user.name}创建成功`,
  //     data: {
  //       id: Date.now(), //用时间模拟自增ID
  //       name: '张三',
  //       age: 20,
  //       email: '',
  //     },
  //   };
  // }
  async findAll() {
    const users = await this.prismaService.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      total: users.length,
      message: '用户列表获取成功',
      data: users,
    }
  }
  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: parseInt(id) },
      select:{
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },

    });
    if (!user) {
      return {
        success: false,
        message: '用户不存在',
      }
    }
    return {
      success: true,
      message: '用户获取成功',
      data: user,
    }
  }

  async removeUser(id: string) {
    return this.prismaService.user.delete({
      where: { id: parseInt(id) },
    }).then(res => {
      return {
        success: true,
        message: `用户${id}删除成功`,
      }
    }).catch(err => {
      return {
        success: false,
        message: `用户${id}不存在`,
      }
    })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: parseInt(id) },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
        role: updateUserDto.role ?? 'user',
      },
    });
    if (!user) {
      return {
        success: false,
        message: `用户${id}不存在`,
      }
    }
    return {
      success: true,
      message: `用户${id}更新成功`,
      data: user,
    }
  }

  getUserById(id: string) {
    return {
      id, //用时间模拟自增ID
      name: '李四',
      age: 20,
      email: 'list.email.com',
    };
  }
  getList(page: number, size: number) {
    const total = 100;
    return [
      {
        id: 1, //用时间模拟自增ID
        name: '用户1',
        age: 20,
        email: 'list.email.com',
      },
      {
        id: 2, //用时间模拟自增ID
        name: '用户2',
        age: 28,
        email: 'list.email.com',
      },
      {
        id: 3, //用时间模拟自增ID
        name: '用户3',
        age: 35,
        email: 'list.email.com',
      },
    ];
  }

  updateUser1(id: string, user: User) {
    const index = this.users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) {
      return {
        success: false,
        message: `用户${id}不存在`,
      };
    }
    return {
      success: true,
      message: `用户${id}更新成功`,
      data: {
        id: parseInt(id),
        name: user.name || this.users[index].name,
        age: user.age || this.users[index].age,
        email: user.email || this.users[index].email,
      },
    };
  }
  deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) {
      return {
        success: false,
        message: `用户${id}不存在`,
      };
    }
    this.users.splice(index, 1);
    return {
      success: true,
      message: `用户${id}删除成功`,
    };
  }
}
