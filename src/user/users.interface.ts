
import {Document} from 'mongoose';
export interface Users extends Document {
    // key :datatype
    readonly username: string;
    readonly email: string;
     password: string;
    readonly  name: string;
    readonly role : string;
    readonly active : boolean;
    hasPassword :boolean;
    passwordChangedAt :Date |number;
    googleId:string;
    passwordRestCode :string;
    passwordRestCodeExpire :string;
    passwordRestCodeVerify :string;
    image :string;

}
type Role = 'admin' |'employee'| "user" ;