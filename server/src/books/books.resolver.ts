import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

interface AuthUser {
  userId: string;
  email?: string;
}

@Resolver(() => Book)
@UseGuards(GqlAuthGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(
    @CurrentUser() user: AuthUser,
    @Args('input') createBookInput: CreateBookInput,
  ) {
    return this.booksService.create(user.userId, createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll(@CurrentUser() user: AuthUser) {
    return this.booksService.findAll(user.userId);
  }

  @Query(() => Book, { name: 'book', nullable: true })
  findOne(
    @CurrentUser() user: AuthUser,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.booksService.findOne(user.userId, id);
  }

  @Mutation(() => Book, { nullable: true })
  updateBook(
    @CurrentUser() user: AuthUser,
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(user.userId, id, updateBookInput);
  }

  @Mutation(() => Boolean)
  deleteBook(
    @CurrentUser() user: AuthUser,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.booksService.remove(user.userId, id);
  }
}
