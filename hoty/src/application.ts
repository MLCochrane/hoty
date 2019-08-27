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
  PasswordHasherBindings,
  PusherServiceBindings,
  PusherServiceConstants,
} from './keys';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';
import { JWTService } from './services/jwt-service';
import { MyUserService } from './services/user-service';
import { BcryptHasher } from './services/hash.password.bcrypt';
import { JWTAuthenticationStrategy } from './auth-strategies/jwt-strategy';
import { PusherComponent } from './pusher/component';

export class HotyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(
    options: ApplicationConfig = {},
    ) {
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
    this.component(PusherComponent);

    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js', '.controller.ts'],
        nested: true,
      },
      repositories: {
        dirs: ['repositories'],
        extensions: ['.repository.js', '.repository.ts'],
        nested: true
      },
      datasources: {
        dirs: ['datasources'],
        extensions: ['.datasource.js', '.datasource.ts'],
        nested: true
      }
    };
  }

  async pusherStart() {
    const pusherService = await this.getPusherComponent();
    // pusherService.initWS(this.options);
  }

  async getPusherComponent() {
    return this.get(PusherServiceBindings.PUSHER_SERVICE);
  }

  setupBindings(): void {
    this.bind(PusherServiceBindings.PUSHER_INSTANCE_LOCATOR).to(
      PusherServiceConstants.PUSHER_INSTANCE_LOCATOR_VALUE,
    );

    this.bind(PusherServiceBindings.PUSHER_SECRET).to(
      PusherServiceConstants.PUSHER_SECRET_VALUE,
    );

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
