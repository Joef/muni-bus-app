import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { IRouteObj } from './route.model';
import { catchError} from 'rxjs/operators';

const URL:string = 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni';
@Injectable({
  providedIn: 'root'
})
/*
 * Class RoutesService
 * Calls to the Routes API.  Currently only one function, needed at app init
 * to get the routes for the entire Muni System.
 */
export class RoutesService {

  constructor(private http:HttpClient) { 

  }
  /*
   * getRoutes: Get the list of transportation routes from the API
   *
   * Returns an Observable for an IRouteObj (see route.model.ts)
   */
  
  getRoutes():Observable<IRouteObj> {
    /* 
     * Initially used this dummy fetch to experiment w/ layout, results 
     * 
     * let subject = new Subject<IRouteObj>()
     * setTimeout(() => {subject.next(ROUTES); subject.complete();},100);
     * return subject; 
     */

    return this.http.get<IRouteObj>(URL)
      .pipe(catchError(this.handleError<IRouteObj>('getRoutes', null)))
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


/*
 * Routes used to quickly debug the legend UI
 */
const ROUTES:IRouteObj = {
  route: [
    {
      title: 'E-Embarcadero',
      tag: 'E',
      color:'667744',
      oppositeColor: 'ffffff'
    },
    {
      title: 'F-Market & Wharves',
      tag: 'F',
      color: '55555',
      oppositeColor:'ffffff'
    }
  ]
}
