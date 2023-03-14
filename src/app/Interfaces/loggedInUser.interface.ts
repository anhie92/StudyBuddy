import { User } from "./user.interface";
import { Study } from "./study.interface";

export interface LoggedInUser {
    User: User;
    Favorites: Study[];
}