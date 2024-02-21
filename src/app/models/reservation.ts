import { Room } from "./room";
import { User } from "./user";

export class Reservation {

    constructor(public id: number,
        public room: Room,
        public date: Date,
        public user: User
        ){}

}
