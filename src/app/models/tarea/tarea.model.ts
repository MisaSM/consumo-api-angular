import { UserModel } from "../user/user.model";

export interface TareaModel {
    idTarea: number;
    tarea: string;
    descripcion: string;
    completada?: boolean;
    usuarioo: UserModel
}