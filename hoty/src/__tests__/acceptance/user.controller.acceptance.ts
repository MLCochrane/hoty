import { Client, expect } from '@loopback/testlab';
import { DataObject } from '@loopback/repository';
import { setupApplication } from './test-helper';
import { HotyApplication } from '../../application';
import { DbDataSource } from '../../datasources';
import {
  UserRepository,
  EventRepository,
} from '../../repositories';
import {
  User
} from '../../models/';
import { PasswordHasher } from '../../services/hash.password.bcrypt';
import { JWTService } from '../../services/jwt-service';
import {
  PasswordHasherBindings,
  TokenServiceConstants,
} from '../../keys';

const uuidv4 = require('uuid/v4');

describe('UserController', () => {
  let app: HotyApplication;
  let client: Client;

  const dbDS = new DbDataSource();
  const eventRepo = new EventRepository(dbDS);
  const userRepo = new UserRepository(dbDS, eventRepo);

  const user = {
    id: uuidv4() as string,
    username: 'Username',
    password: 'p4ssw0rd',
    email: 'test@test.com',
    firstName: 'Example',
    lastName: 'User',
  };

  let passwordHasher: PasswordHasher;
  let expiredToken: string;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });
  before(migrateSchema);
  before(createPasswordHasher);
  before(givenAnExpiredToken);

  beforeEach(clearDatabase);
  // assertions

  after(async () => {
    await app.stop();
  });

  async function clearDatabase() {
    await userRepo.deleteAll();
  }

  async function migrateSchema() {
    await app.migrateSchema();
  }

  async function createAUser() {
    const encryptedPassword = await passwordHasher.hashPassword(user.password);
    user.password = encryptedPassword;
    const newUser = await userRepo.create(user);
    // MongoDB returns an id object we need to convert to string
    // newUser.id = newUser.id.toString();

    return newUser;
  }

  async function createPasswordHasher() {
    passwordHasher = await app.get(PasswordHasherBindings.PASSWORD_HASHER);
  }

  /**
   * Creates an expired token
   *
   * Specifying a negative value for 'expiresIn' so the
   * token is automatically expired
   */
  async function givenAnExpiredToken() {
    const newUser = await createAUser();
    const tokenService: JWTService = new JWTService(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
      '-1',
    );
    const userProfile = {
      id: newUser.id,
      name: `${newUser.firstName} ${newUser.lastName}`,
    };
    expiredToken = await tokenService.generateToken(userProfile);
  }
});

