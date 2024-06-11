import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, ListModule, CategoryModule],
  controllers:[],
  providers:[]
})
export class AppModule {}
