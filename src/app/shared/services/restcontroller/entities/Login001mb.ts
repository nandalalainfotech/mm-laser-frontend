import { BaseEntity } from "./BaseEntity";

export class Login001mb extends BaseEntity {
    loginId?: number;
    username?: string | null;
    password?: number | null;
    domain?: string | null;
}