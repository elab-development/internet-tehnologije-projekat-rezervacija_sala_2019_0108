export class Room {

    constructor(public id: number,
        public name: string,
        public type: string,
        public capacity: number,
        public location: string,
        public equipment: string[],
        public squareFootage: number,
        public price: number,
        public description: string,
        public imageUrl: string){
    }
    
}
