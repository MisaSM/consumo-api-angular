import { UserModel } from "../user/user.model";

export interface CreateTareaModel {
    tarea: string;
    descripcion: string;
    usuarioo: UserModel
}