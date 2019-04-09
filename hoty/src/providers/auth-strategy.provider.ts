import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import { Strategy as BearerStrategy} from 'passport-http-bearer';
import {
	AuthenticationBindings,
	AuthenticationMetadata,
} from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';

import { verify } from 'jsonwebtoken';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
	constructor(
		@inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
		@repository(UserRepository) public userRepository : UserRepository,
	) {}

	value(): ValueOrPromise<Strategy | undefined> {
		// The function was not decorated, so we shouldn't attempt authentication
		if (!this.metadata) {
			return undefined;
		}

		const name = this.metadata.strategy;
		if (name === 'jwt') {
			return new BearerStrategy(this.auth.bind(this));
		} else {
			return Promise.reject(`The strategy ${name} is not available.`);
		}
	}
	async auth(
		token: string,
		cb: (err: Error | null, user?: object | false) => void,
	) {
		try {
			const user: Object = verify(token, 'privateKey');
			cb(null, user);
		}
		catch(ex) {
			cb(null, false);
		}
	}
}