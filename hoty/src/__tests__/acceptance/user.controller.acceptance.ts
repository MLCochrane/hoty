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
    username: 'AwesomePal',
    password: 'p4ssw0rd',
    email: 'test@test.com',
    firstName: 'Test',
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

  after(async () => {
    await app.stop();
  });

  describe('creating users', () => {
    beforeEach(clearDatabase);

    it('creates new user when POST /api/users is invoked', async () => {
      const res = await client
      .post('/api/users')
      .send(user)
      .expect(200);

      expect(res.body.email).to.equal('test@test.com');
      expect(res.body.firstName).to.equal('Test');
      expect(res.body.lastName).to.equal('User');
      expect(res.body.username).to.equal('AwesomePal');
      expect(res.body).to.have.property('id');
      expect(res.body).to.not.have.property('password');
    });

    it('throws error for POST /api/users with a missing email', async () => {
      const res = await client
      .post('/api/users')
      .send({
        username: 'username',
        password: 'p4ssw0rd',
        firstName: 'Example',
        lastName: 'User',
      })
      .expect(422);

      const errorText = JSON.parse(res.error.text);
      expect(errorText.error.details[0].info.missingProperty).to.equal('email');
    });

    it('throws error for POST /api/users with a missing username', async () => {
      const res = await client
      .post('/api/users')
      .send({
        email: 'test@test.com',
        password: 'p4ssw0rd',
        firstName: 'Example',
        lastName: 'User',
      })
      .expect(422);

      const errorText = JSON.parse(res.error.text);
      expect(errorText.error.details[0].info.missingProperty).to.equal('username');
    });

    it('throws error for POST /api/users with a missing password', async () => {
      const res = await client
      .post('/api/users')
      .send({
        email: 'test@test2.com',
        username: 'John',
      })
      .expect(422);

      const errorText = JSON.parse(res.error.text);
      expect(errorText.error.details[0].info.missingProperty).to.equal('password');
    });

    it('throws error for POST /api/users with an existing email', async () => {
      const userOne = givenUser({
        email: 'testing@test.com',
        username: 'newestUser'
      });
      const userTwo = givenUser({
        email: 'testing@test.com',
        username: 'evenNewerUser'
      });

      await client
        .post('/api/users')
        .send(userOne)
        .expect(200);
      const res = await client
        .post('/api/users')
        .send(userTwo)
        .expect(409);

      expect(res.body.error.message).to.equal('Email already in use');
    });

    it('throws error for POST /api/users with an existing username', async () => {
      const userOne = givenUser({
        email: 'test@tester.com',
        username: 'popularUsername'
      });
      const userTwo = givenUser({
        email: 'testing-unique@test.com',
        username: 'popularUsername'
      });

      await client
        .post('/api/users')
        .send(userOne)
        .expect(200);
      const res = await client
        .post('/api/users')
        .send(userTwo)
        .expect(409);

      expect(res.body.error.message).to.equal('Username already in use');
    });
  });


  async function clearDatabase() {
    await userRepo.deleteAll();
  }

  async function migrateSchema() {
    await app.migrateSchema();
  }

  async function createAUser() {
    const encryptedPassword = await passwordHasher.hashPassword(user.password);
    const leUser = givenUser({
      password: encryptedPassword
    });
    const newUser = await userRepo.create(leUser);
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

  function givenUser(user?: Partial<User>) {
    const data = Object.assign(
      {
        id: uuidv4(),
        username: 'Username',
        password: 'p4ssw0rd',
        email: 'test@test.com',
        firstName: 'Example',
        lastName: 'User',
      },
      user,
    );
    return new User(data);
  }
});

