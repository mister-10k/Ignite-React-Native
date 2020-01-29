export interface CardProp {
    title: string;
    componentType: string;
    data?: any
}

export interface HabitListDetail {
    id: number; 
    icon: string;
    name: string; 
    streak: number;
}

export interface HabitListDetailProp {
    habit: HabitListDetail
}