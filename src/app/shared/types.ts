export interface Habit {
    id?: number; 
    icon?: string;
    name: string; 
    streak: number;
    color?: string,
    frequency: Array<Days>
}

export enum Days {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export interface Action {
    type: string
    payload: any
}