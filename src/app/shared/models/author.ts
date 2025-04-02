export interface Author {
    id: string;
    name: string;
}

export type AuthorCreation = Omit<Author, 'id'>;