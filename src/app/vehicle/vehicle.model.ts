/*
 * IVehicleObj
 * Adding some type safety around what is returned from the API endpoint
*/
export interface IVehicleObj {
    vehicle: IVehicle[]
    copyright?:string
    lastTime: {
        time:number
    }
    Error?: any

}
/* 
 * IVehicle
 * Object model for a vehicle within a bus route
 */

export interface IVehicle {
    id: string
    lon?: number
    lat?: number
    routeTag: string
    speedKmHr?: number
    predictable?: boolean
    dirTag?: string
    secsSinceReport?: number
    heading?: number
    update?:boolean
}