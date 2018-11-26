import { IVehicleObj } from "./vehicle.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IRoute } from "../routes/route.model";
import { catchError} from 'rxjs/operators';

const URL:string = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni';

@Injectable({
    providedIn: 'root'
})
/*
 * Class VehicleService
 * Calls to the Vehicle API.  Currently only one function to get the vehicles for a 
 * selected route.
 */
export class VehicleService {

    constructor(private http:HttpClient) {

    }
    /*
     * buildRequest: Take the route and form the request url for vehicles
     * Initial requests will pass a last updated time of 0.
     * 
     * Returns the url for the request
     */
    buildRequest(route:IRoute):string {
        var send = URL + '&r=' + route.tag;
        send += '&t=' + route.lastUpdated.toString();

        return send;
    }
    /*
     * getVehicles: Build the url string and then submit an http request
     * 
     * Returns an Observable for an IVehicleObj
     */
    getVehicles(route:IRoute):Observable<IVehicleObj> {
        return this.http.get<IVehicleObj>(this.buildRequest(route))
        .pipe(catchError(this.handleError<IVehicleObj>('getRoutes', null)));
    }

    /*
    * handleError: catching any errors from calls to the API
    */
    private handleError<T> (operation='operation',result?:T) {
        return (error:any): Observable<T> => {
          console.error(error);
          return of(result as T);
        }
      }
} 
