export interface Course {
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
    id: string;
}

export type CourseCreation = Omit<Course, 'id' | 'creationDate'>;