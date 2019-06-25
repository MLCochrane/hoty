import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../models';
import {UserProfile} from '@loopback/authentication';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

import * as _ from 'lodash';


export type Credentials = {
  email: string;
  password: string;
};

export type FormattedUser = {
  username: string,
  firstName: string,
  lastName: string
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }

  async fetchUser(user: UserProfile) {
    const curUser = await super.findById(user.id);
    const formatUser = _.pick(curUser, ['username', 'firstName', 'lastName']);
    return formatUser;
  }
}
