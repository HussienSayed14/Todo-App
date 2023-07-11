import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// export const typeOrmConfig: TypeOrmModuleOptions =
// {
//     type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'root',
//       database: 'todo_app',
//       entities: ['dist/**/*.entity{.ts,.js}'],
//       synchronize: true
// };

export const typeOrmConfig: TypeOrmModuleOptions =
{
    type: 'mysql',
      host: 'containers-us-west-146.railway.app',
      port: 7588,
      username: 'root',
      password: 'pUKdjLZ3v1tn7koN7Lm8',
      database: 'railway',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
};
