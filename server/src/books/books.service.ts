import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBookInput: CreateBookInput) {
    return this.prisma.book.create({
      data: {
        ...createBookInput,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    return this.prisma.book.findFirst({
      where: { id, userId },
    });
  }

  async update(userId: string, id: string, updateBookInput: UpdateBookInput) {
    // First check ownership
    const book = await this.findOne(userId, id);
    if (!book) {
      return null;
    }
    return this.prisma.book.update({
      where: { id },
      data: updateBookInput,
    });
  }

  async remove(userId: string, id: string) {
    // First check ownership
    const book = await this.findOne(userId, id);
    if (!book) {
      return false;
    }
    await this.prisma.book.delete({
      where: { id },
    });
    return true;
  }
}
