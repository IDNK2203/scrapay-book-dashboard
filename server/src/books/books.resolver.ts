import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('input') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book, { nullable: true })
  updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Boolean)
  deleteBook(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.remove(id);
  }
}
