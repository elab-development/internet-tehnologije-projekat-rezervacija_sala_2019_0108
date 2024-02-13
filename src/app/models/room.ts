export class Room {

    constructor(private id: number,
                private name: string,
                private type: string,
                private capacity: number,
                private location: string,
                private equipment: string[],
                private availability: string,
                private price: number,
                private description: string,
                private imageUrl: string){
    }
    
}
