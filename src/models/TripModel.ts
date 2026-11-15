import { TripType } from "./TripType";

export type TripModel = {
    country:string;
    city:string;
    days:number;
    tripType: TripType;
}