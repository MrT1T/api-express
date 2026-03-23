import { injectable } from 'inversify';

import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';

import type { IUsersService } from './users.service.interface';
import { User } from './user.entity.js';

@injectable()
export class UsersService implements IUsersService {
	async createUser({ email, name, password }: UserRegisterDto) {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto) {
		return true;
	}
}
