import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(255, { message: 'Name must be 255 characters or less' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString()
  @MaxLength(255, { message: 'Author must be 255 characters or less' })
  author: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must be 1000 characters or less' })
  description?: string;
}
