export interface Habit {
    id?: number; 
    icon?: string;
    name: string; 
    streak: number;
    color: string,
    frequency: Array<Days>
}

export enum HabitColor {
    SoftPink = '#DC6788',
    SoftBlue ='#67B7DC',
    SoftBlue2 =  '#6794DC',
    SoftBlue3 = '#6771DC',
    SoftPurple = '#8067DC',
    SoftViolet =  '#A367DC',
    SoftMagenta = '#C767DC',
    SoftMagenta2 =  '#DC67CE'
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