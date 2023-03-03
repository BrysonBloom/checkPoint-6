import { Schema } from "mongoose"
import { defaultSchemaOptions } from "../db/Constants"

export const AttendeeSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
}, defaultSchemaOptions)

AttendeeSchema.virtual('profile', {
    ref: 'Account',
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
})
AttendeeSchema.virtual('event', {
    ref: 'TowerEvent',
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
})