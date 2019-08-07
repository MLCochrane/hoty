import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {
  TokenServiceBindings,
  UserServiceBindings,
  TokenServiceConstants,
  PasswordHasherBindings
} from './keys';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import { JWTService } from './services/jwt-service';
import { MyUserService } from './services/user-service';
import { BcryptHasher } from './services/hash.password.bcrypt';
import { JWTAuthenticationStrategy } from './auth-strategies/jwt-strategy';


export class HotyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {
    cors: {
      origin: 'http://localhost:3001',
    },
  }) {
    super(options);

    this.projectRoot = __dirname;

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);

    this.component(AuthenticationComponent);

    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.confirmServer();


    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async confirmServer(): Promise<any> {
    const server = await this.getServer('RestServer');
    const io = require('socket.io')(server);

    io.set('origins', 'http://localhost:3001/');
    io.origins((origin: any, callback: any) => {
      if (origin !== 'http://localhost:3001/') {
          return callback('origin not allowed', false);
      }
      callback(null, true);
    });
    const nsp = io.of('/my-namespace');
    nsp.on('connection', function(socket: any){
      console.log('someone connected');
    });
    nsp.emit('hi', 'everyone!');

    // io.on('connection', function (socket: any) {
    //   socket.emit('news', { hello: 'world' });
    //   socket.on('my other event', function (data: any) {
    //     console.log(data);
    //   });
    // });
  }
}
