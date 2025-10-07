import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat, Prisma } from 'generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateCatDto } from '../../common/dto/create-cat.dto';
import { UpdateCatDto } from '../../common/dto/update-cat.dto';


@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateCatDto): Promise<Cat> {
    return this.prisma.cat.create({
      data: { name: dto.name, age: dto.age },
    });
  }

  // READ ALL
  async findAll(): Promise<Cat[]> {
    return this.prisma.cat.findMany({ orderBy: { id: 'asc' } });
  }

  // READ ONE
  async findOne(id: number): Promise<Cat> {
    const cat = await this.prisma.cat.findUnique({ where: { id } });
    if (!cat) throw new NotFoundException(`Cat with id ${id} not found`);
    return cat;
  }

  // UPDATE
  async update(id: number, dto: UpdateCatDto): Promise<Cat> {
    try {
      return await this.prisma.cat.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.age !== undefined && { age: dto.age }),
        },
      });
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      throw e;
    }
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.cat.delete({ where: { id } });
      return { message: `Cat #${id} removed` };
    } catch (e) {
      if ((e as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
        throw new NotFoundException(`Cat with id ${id} not found`);
      }
      throw e;
    }
  }
}
