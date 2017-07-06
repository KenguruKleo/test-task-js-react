import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const markerSchema = new Schema({
    pos: [ {type: Number} ]
});

const markersSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    markers: [ markerSchema ]
});

const modelMarkers = mongoose.model('markers', markersSchema);

export default modelMarkers;
