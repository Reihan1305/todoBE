import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor (private readonly prisma :PrismaService) {}

  async create(createListDto: CreateListDto) {
    return await this.prisma.list.create({
      data:{
        content:createListDto.content,
        categoryId:createListDto.categoryId,
        userId:createListDto.userId
      }
    });
  }

  async findAllBbyCategory(id:number) {
    return await this.prisma.list.findMany({where:{categoryId:id}});
  }

  async findOne(id: number) {
    return await this.prisma.list.findFirst({
      where:{id},
      include:{
        catogory:true,
        user:true
      }
    });
  }

  async update(id: number, updateListDto: UpdateListDto) {
    return await this.prisma.list.update({where:{id},
      data:{
        content:updateListDto.content
    }});
  }

  async remove(id: number) {
    return await this.prisma.list.delete({where:{id}});
  }
}
