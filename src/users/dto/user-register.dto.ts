import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect email' })
	email: string;

	@IsString({ message: 'Password must be exist' })
	password: string;

	@IsString({ message: 'Name must be exist' })
	name: string;
}
