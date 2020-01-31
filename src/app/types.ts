export interface CardProp {
    title: string;
    componentType: string;
    data?: any;
    paddingVertical?: number;
}

export interface Habit {
    id: number; 
    icon: string;
    name: string; 
    streak: number;
}

export interface HabitListDetailProp {
    habit: Habit;
    bottomDivider: boolean;
}