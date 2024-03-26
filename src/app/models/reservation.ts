import { Room } from "./room";
import { User } from "./user";

export class Reservation {

    constructor(public id: number,
        public room: Room,
        public date: Date,
        public user: User
        ){}

        toLaravelObject() {
            return {
                room_id: this.room.id, 
                reserved_date: this.date.toISOString().slice(0, 19).replace('T', ' '), 
                user_id: this.user.id 
            };
        }
        
}
