import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent'
import { TicketSchema } from '../models/Ticket';
import { AttendeeSchema } from '../models/Attendee';
import { CommentSchema } from '../models/Comment';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);


  Tickets = mongoose.model('Ticket', TicketSchema)


  Attendees = mongoose.model('Attendee', AttendeeSchema)


  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
