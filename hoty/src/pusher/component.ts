import { createBindingFromClass } from '@loopback/context';
import { Component } from '@loopback/core';
import { Pusher } from '../keys';
import { PusherService } from './pusher-service';

export class PusherComponent implements Component {
  bindings = [
    createBindingFromClass(PusherService, {
      key: Pusher.PUSHER_SERVICE,
    }),
  ];
}