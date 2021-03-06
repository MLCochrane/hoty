import {inject} from '@loopback/context';
import {
  post,
  get,
  del,
  patch,
  param,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import {
  authenticate,
  UserProfile,
  AuthenticationBindings
} from '@loopback/authentication';
import {repository, Filter} from '@loopback/repository';
import {UserRepository, EventRepository} from '../repositories/';
// import { FormattedEvent } from '../repositories/event.repository';
import {User, Event} from '../models';


export class UserEventsControllerController {
  constructor(
    @repository(UserRepository) protected userRepository : UserRepository,
    @repository(EventRepository) protected eventRepository : EventRepository,
  ) {}

  @post('/users/{id}/event')
  @authenticate('jwt')
  async createEvent(
    @param.path.string('id') userId: typeof User.prototype.id,
    @inject(AuthenticationBindings.CURRENT_USER) currentUserProfile: UserProfile,
    @requestBody() eventData: Event,
  ): Promise<Event> {

    // No referential integrity so we want to confirm user id exists
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpErrors.Conflict('User not found');
    }

    // Checks that user id passed matches the current authenticated user
    if (userId !== currentUserProfile.id) {
      throw new HttpErrors.Conflict('Incorrect user id');
    }

    eventData['fullName'] = `${user.firstName} ${user.lastName}`;

    return await this.userRepository.events(userId).create(eventData);
  }

  @get('/users/{id}/event')
  @authenticate('jwt')
  async getUserEvents(
    @param.path.string('id') userId: typeof User.prototype.id,
    @param.query.object('filter') filter?: Filter<Event>,
  ): Promise<Event[]> {
    return await this.userRepository.events(userId).find(filter)
  }

  @get('/users/event')
  @authenticate('jwt')
  async getEvents(
    // @param.query.object('filter') filter?: Filter<Event>,
  ): Promise<Object[]> {
    return await this.eventRepository.fetchAll();
  }

  // NEED TO ADD LOGIC FOR MAARKING AS ATTENDING VS ACTUALLY EDITING
  @patch('/users/{id}/event/{eventId}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @del('/users/{id}/event/{eventId}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteEvent(
    @param.path.string('id') userId: string,
    @param.path.number('eventId') eventId: number,
    @inject(AuthenticationBindings.CURRENT_USER) currentUserProfile: UserProfile
  ): Promise<void> {
    // No referential integrity so we want to confirm user id exists
    const isUser = await this.userRepository.findById(userId);

    if (!isUser) {
      throw new HttpErrors.Conflict('User not found');
    }

    // Checks that user id passed matches the current authenticated user
    if (userId !== currentUserProfile.id) {
      throw new HttpErrors.Conflict('Incorrect user id');
    }

    return await this.eventRepository.deleteById(eventId);
  }
}