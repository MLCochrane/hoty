import { HttpServer } from '@loopback/http-server';
import { inject } from '@loopback/context';
import { ApplicationConfig } from '@loopback/core';
import * as express from 'express';
import Chatkit from '@pusher/chatkit-server';
import {
  repository,
} from '@loopback/repository';
import {
  UserRepository,
} from '../repositories';
import {
  PusherServiceBindings,
} from '../keys';

interface PusherUser {
  id: string,
  name: string,
  customData?: object,
};

export class PusherService {
  protected httpServer: HttpServer;
  public chatkit: Chatkit;
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PusherServiceBindings.PUSHER_INSTANCE_LOCATOR)
    private pusherLocator: string,
    @inject(PusherServiceBindings.PUSHER_SECRET)
    private pusherKey: string,
  )
  {
    this.bindMethods.apply(this);
    this.initWS();
  }

  bindMethods(): void {
    this.initWS = this.initWS.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  initWS(): void {
    this.chatkit = new Chatkit({
      instanceLocator: this.pusherLocator,
      key: this.pusherKey,
    });
    console.log('Component still running');
  }

  async getUser(id: string): Promise<PusherUser> {
    try {
      return await this.chatkit.getUser({id});
    } catch (e) {
      return e;
    }
  }

  async getUsers(): Promise<PusherUser[]> {
    try {
      return await this.chatkit.getUsers();
    } catch (e) {
      return e;
    }
  }

  async createUser(user: PusherUser): Promise<any> {
    try {
      return await this.chatkit.createUser(user);
    } catch(e) {
      return e;
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.chatkit.asyncDeleteUser({ userId });
    } catch (e) {
      return e;
    }
  }

  async getDeleteStatus(jobId: string) {
    try {
      return await this.chatkit.getDeleteStatus({ jobId });
    } catch (e) {
      return e;
    }
  }
}