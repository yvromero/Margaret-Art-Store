export interface IUser {
    _id      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;

    createAt?: string;
    updateAt?: string;
}