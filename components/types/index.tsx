export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Exercise {
    _id: string;
    name: string;
    userID: string;
    primaryMuscleGroup: string;
    secondaryMuscleGroup?: string;
}

export interface Set {
    exerciseID: string;
    reps: number;
    weight: number;
    weightUnit: string;
}

export interface Workout {
    workoutID: string;
    userID: string;
    inProgress: boolean;
}