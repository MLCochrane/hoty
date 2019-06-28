import {inject} from '@loopback/context';
import {
  post,
  get,
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
    const isUser = await this.userRepository.findById(userId);

    if (!isUser) {
      throw new HttpErrors.Conflict('User not found');
    }

    // Checks that user id passed matches the current authenticated user
    if (userId !== currentUserProfile.id) {
      throw new HttpErrors.Conflict('Incorrect user id');
    }

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
}