import {inject} from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
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
} from '@loopback/authentication';

import {User} from '../models';
import {UserRepository} from '../repositories';

import * as bcrypt from 'bcrypt';

class Credentials {
  username: string;
  password: string;
}

export class UserController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true}) private user: UserProfile,
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

    @post('/users/login', {
    responses: {
      '200': {
        description: 'Login',
        // content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async login(@requestBody() credentials: Credentials): Promise<object> {
    const filter = {
      where: {
        username: credentials.username
      }
    }
    
    const user = await this.userRepository.findOne(filter);
    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    const validPass = await bcrypt.compare(credentials.password, user.password);
    if (!validPass) {
      throw new HttpErrors.Unauthorized('Incorrect username or password');
    }

    // If user found with correct username and password, generate token
    const token = user.generateAuthToken();
    return {
      'token': token
    }
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    // Search usernames for new entered username
    const filter: Filter = {
      where: {
        username: user.username
      }
    }
    const usernameUsed = await this.userRepository.findOne(filter);
    if (usernameUsed) {
      throw new HttpErrors.Conflict('Username already in use');
    }

    // Hashing password for db
    const { ...newUser } = user;
    newUser.password = await bcrypt.hash(user.password, 10);

    await this.userRepository.create(newUser);
    return user;
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @authenticate('jwt')
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
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
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
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
  async replaceById(
    @param.path.number('id') id: number,
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
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
