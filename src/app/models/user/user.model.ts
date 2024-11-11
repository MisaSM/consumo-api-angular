import { TareaModel } from "../tarea/tarea.model";

export interface UserModel {
    idUser: number;
    names: string;
    userName: string;
    password: number;
    tasks: TareaModel[];
}