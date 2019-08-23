import { HttpServer } from '@loopback/http-server';
import { ApplicationConfig } from '@loopback/core';
import * as express from 'express';
import {
  repository,
} from '@loopback/repository';
import {
  UserRepository,
} from '../repositories';
import { WebSocketController } from '../controllers';
import { WebSocketServer } from '../websocket/websocket.server';

export class PusherService {
  protected httpServer: HttpServer;
  protected wsServer: WebSocketServer;
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  )
  {}

  initWS(options: ApplicationConfig = {}): WebSocketServer {
    const expressApp = express();

    // Create an http server backed by the Express app
    this.httpServer = new HttpServer(expressApp, options.websocket);

    // Create ws server from the http server
    this.wsServer = new WebSocketServer(this.httpServer);
    this.wsServer.use((socket, next) => {
      console.log('Global middleware - socket:', socket.id);
      next();
    });
    // Add a route
    const ns = this.wsServer.route(WebSocketController, /^\/chats\/\d+$/);
    ns.use((socket, next) => {
      console.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });

    return this.wsServer;
  }
}