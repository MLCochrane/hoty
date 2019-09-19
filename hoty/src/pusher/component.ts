import {
  createBindingFromClass,
  bind,
} from '@loopback/context';
import { Component } from '@loopback/core';
import {
  PusherServiceBindings,
  PusherServiceConstants,
} from '../keys';
import { PusherService } from './pusher-service';

export class PusherComponent implements Component {
  bindings = [
    createBindingFromClass(PusherService, {
      key: PusherServiceBindings.PUSHER_SERVICE,
    }),
  ];
}