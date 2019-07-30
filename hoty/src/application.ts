import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import { HttpServer } from '@loopback/http-server';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import * as express from 'express';
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

import { WebSocketController } from './controllers';
import { WebSocketServer } from './websocket/websocket.server';

export class HotyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  readonly httpServer: HttpServer;
  readonly wsServer: WebSocketServer;
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.projectRoot = __dirname;

    this.setupBindings();

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

    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    const expressApp = express();

    // Create an http server backed by the Express app
    this.httpServer = new HttpServer(expressApp, options.websocket);

    // Create ws server from the http server
    const wsServer = new WebSocketServer(this.httpServer);
    this.bind('servers.websocket.server1').to(wsServer);
    wsServer.use((socket, next) => {
      console.log('Global middleware - socket:', socket.id);
      next();
    });
    // Add a route
    const ns = wsServer.route(WebSocketController, /^\/chats\/\d+$/);
    ns.use((socket, next) => {
      console.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });

    this.wsServer = wsServer;
  }

  async wsStart() {
    await this.wsServer.start();
  }

  async wsStop() {
    await this.wsServer.stop();
  }

  setupBindings(): void {
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
  }
}
