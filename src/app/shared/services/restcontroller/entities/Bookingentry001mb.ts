import { BaseEntity } from "./BaseEntity";

export class Bookingentry001mb extends BaseEntity {
    bookingId?: number;
    mslno?: string;
    dslno?: string;
    hospital?: string;
    staff?: string;
    date?: Date;
    time?: string;
    appNo?: string | any;
}
