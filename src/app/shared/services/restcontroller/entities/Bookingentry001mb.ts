import { BaseEntity } from "./BaseEntity";

export class Bookingentry001mb extends BaseEntity {
    bookingId?: number;
    mslno?: string;
    dslno?: string;
    hospital?: string;
    staff?: string;
    date?: Date;
    // days?: string;
    starttime?: string;
    endtime?: string;
    // previewWeek?: Date;
}
