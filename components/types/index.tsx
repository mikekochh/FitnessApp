export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createData: Date;
}

export interface Exercise {
    _id: string;
    name: string;
    user: User;
    primaryMuscleGroup: string;
    secondaryMuscleGroup?: string;
    createdDate: Date;
}