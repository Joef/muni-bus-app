import { IVehicle } from "../vehicle/vehicle.model";

/*
 * IRouteObj
 * Adding some type safety around what is returned from the API endpoing
*/
export interface IRouteObj {
    route: IRoute[]
    copyright?:string
    
}

/* 
 * IRoute
 * Object model for a bus route
 */
export interface IRoute {
    title: string
    tag: string
    latMax?: number
    latMin?: number
    lonMax?: number
    lonMin?: number
    color: string
    oppositeColor:string
    path?: [
        { 
            point: [{
                lat: number
                lon: number
            }]
        }
    ],
    vehicles?: IVehicle[]

    //additional UI or APP fields
    lastUpdated?:number,
    timerId?:any,
    show?:boolean
    
}
