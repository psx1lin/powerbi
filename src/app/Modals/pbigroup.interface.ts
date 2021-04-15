import { PBIUSER } from "./pbiuser.interface";

export interface PBIGROUP {
    SamAccountName?: string ;
    Name?: string ;
    Description?: string ;
}


export interface PBIGROUPUSERS {
    pg?: PBIGROUP ;
    p?: PBIUSER[] ;
}