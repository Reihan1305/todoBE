import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor (private readonly prisma :PrismaService){}
  
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data:{
        Content:createCategoryDto.content,
        userId:createCategoryDto.userId
      }
    });
  }

  async findAll(id:number) {
    
    return await this.prisma.category.findMany({
      where:{userId:id}
    });
  }

  async findOne(id: number) {
    return await this.prisma.category.findFirst({where:{id},include:{list:true}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({where:{id},
    data:updateCategoryDto}) ;
  }

  async remove(id: number) {
    return await this.prisma.category.delete({where:{id}});
  }
}
