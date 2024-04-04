export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Exercise {
    _id: string;
    name: string;
    user: User;
    primaryMuscleGroup: string;
    secondaryMuscleGroup?: string;
    createdDate: Date;
}