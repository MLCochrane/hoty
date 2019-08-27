import {
  HotyApplication
} from './application';
import {
  ApplicationConfig
} from '@loopback/core';
import * as express from 'express';
import * as path from 'path';
import pEvent from 'p-event';
import * as http from 'http';

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: HotyApplication;
  private server: http.Server;
  constructor(private options: ApplicationConfig = {}) {
    this.app = express();

    this.lbApp = new HotyApplication(options);

    // Expose the front-end assets via Express, not as LB4 route
    this.app.use('/api', this.lbApp.requestHandler);

    // Serve static files in the public folder
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    const port = this.options.rest.port || 3000;
    const host = this.options.rest.host || '127.0.0.1';
    this.server = this.app.listen(port, host);

    await this.lbApp.pusherStart();
    await pEvent(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    this.server.close();
    await pEvent(this.server, 'close');
  }
}