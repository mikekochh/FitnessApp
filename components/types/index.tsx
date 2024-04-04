// export interface User {
//     id: string;
//     username: string;
//     email: string;
//     password: string;
//     createData: Date;
// }

// export interface UserState extends Omit<User, 'password' | 'createData'> {}

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