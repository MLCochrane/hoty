import * as _ from 'lodash';
import {inject} from '@loopback/context';
import {
  Count,
  CountSchema,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import { validateCredentials } from '../services/validator';

import {User} from '../models';
import {
  UserRepository,
} from '../repositories';
import { Credentials, FormattedUser } from '../repositories/user.repository';
import { PasswordHasher } from '../services/hash.password.bcrypt';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
  PusherServiceBindings,
} from '../keys';
import { PusherService } from '../pusher/pusher-service';

const uuidv4 = require('uuid/v4');

const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(PusherServiceBindings.PUSHER_SERVICE) public pusherService: PusherService,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(@requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // This will ensure a user exists and password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // Converts object with a reduced set of properties
    const userProfile = this.userService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @post('/users')
  async create(@requestBody() user: User): Promise<any> {

    validateCredentials(_.pick(user, ['email', 'password']));

    // Search usernames for new entered username
    const filter = {
      where: {
        username: user.username
      }
    }
    const usernameUsed = await this.userRepository.findOne(filter);

    if (usernameUsed) {
      throw new HttpErrors.Conflict('Username already in use');
    }

    const emailInUse = await this.userRepository.findOne({where: {email: user.email}});

    if (emailInUse) {
      throw new HttpErrors.Conflict('Email already in use');
    }

    user.password = await this.passwordHasher.hashPassword(user.password);
    // Creates random uuid
    user.id = uuidv4();

    try {
      // create the new user
      const savedUser = await this.userRepository.create(user);
      delete savedUser.password;

      await this.pusherService.createUser({
        id: savedUser.id,
        name: savedUser.username
      });

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'Current user profile',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['id'],
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(AuthenticationBindings.CURRENT_USER) currentUserProfile: UserProfile
  ): Promise<FormattedUser> {
    return await this.userRepository.fetchUser(currentUserProfile);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
    await this.pusherService.deleteUser(id);
  }
}
