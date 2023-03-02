import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const TowerEventSchema = new Schema({
    name: basicStringType,
    description: { type: String, max: 2000, required: true },
    location: basicStringType,
    startDate: { type: Date, default: Date.now },
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", },
    type: { ...basicStringType, enum: ["expo", "convention", "exhibit", "sport", "digital", "concert"] },
    coverImg: { type: String, required: true },
    capacity: { type: Number, default: 0, required: true },
    isCanceled: { type: Boolean, default: false, required: false },







}, defaultSchemaOptions);

TowerEventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true

}
)