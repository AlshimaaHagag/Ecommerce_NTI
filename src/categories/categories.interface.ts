
import {Document} from 'mongoose';
export interface Categories extends Document {
    // key :datatype
    readonly name: string;
    image :string;
}