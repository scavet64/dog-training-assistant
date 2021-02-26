import {
    v4 as uuidv4
} from "uuid";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    _id: {
        type: String,
        default: () => uuidv4(),
    },
    activityType: String
}, {
    timestamps: true,
});

export default mongoose.model('Activity', activitySchema);