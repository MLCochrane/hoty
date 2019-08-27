import { BindingKey } from '@loopback/context';
import { PasswordHasher } from './services/hash.password.bcrypt';
import { TokenService, UserService } from '@loopback/authentication';
import { User } from './models';
import { Credentials } from './repositories';
import { PusherService } from './pusher/pusher-service';

// Simply allows us to access .env values here
require('dotenv').config();

export namespace TokenServiceConstants {
	export const TOKEN_SECRET_VALUE = process.env.TOKEN_SECRET_VALUE;
	export const TOKEN_EXPIRES_IN_VALUE = process.env.TOKEN_EXPIRES_IN_VALUE;
}

export namespace PusherServiceConstants {
	export const PUSHER_INSTANCE_LOCATOR_VALUE = process.env.PUSHER_INSTANCE_LOCATOR_VALUE;
	export const PUSHER_SECRET_VALUE = process.env.PUSHER_SECRET_VALUE;
}

export namespace TokenServiceBindings {
	export const TOKEN_SECRET = BindingKey.create<string | undefined>(
		'authentication.jwt.secret',
	);
	export const TOKEN_EXPIRES_IN = BindingKey.create<string | undefined>(
		'authentication.jwt.expires.in.seconds',
	);
	export const TOKEN_SERVICE = BindingKey.create<TokenService>(
		'services.authentication.jwt.tokenservice',
	);
}

export namespace PasswordHasherBindings {
	export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
		'services.hasher',
	);
	export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
	export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
		'services.user.service',
	);
}

export namespace PusherServiceBindings {
	export const PUSHER_SERVICE = BindingKey.create<PusherService>(
		'services.pusher.service',
	);
	export const PUSHER_INSTANCE_LOCATOR = BindingKey.create<string | undefined>(
		'services.pusher.locator',
	);
	export const PUSHER_SECRET = BindingKey.create<string | undefined>(
		'services.pusher.secret',
	);
}