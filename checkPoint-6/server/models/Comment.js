import mongoose from "mongoose";
import { defaultSchemaOptions, basicStringType } from "../db/Constants";


const Schema = mongoose.Schema

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    body: basicStringType,
    isAttending: { type: Boolean, required: true }

}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})