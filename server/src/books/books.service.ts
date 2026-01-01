import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookInput: CreateBookInput) {
    return this.prisma.book.create({
      data: createBookInput,
    });
  }

  async findAll() {
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateBookInput: UpdateBookInput) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  async remove(id: string) {
    await this.prisma.book.delete({
      where: { id },
    });
    return true;
  }
}
