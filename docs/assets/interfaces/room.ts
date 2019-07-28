export interface Room {
    id: number,
    adults: number,
    children: [{id?: number, age?: number}?],
    infants: number
    
}
