import { Component, OnInit } from '@angular/core';
import { RoutesService } from './routes/routes.service';
import { IRoute, IRouteObj } from './routes/route.model';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  routes:IRoute[];
  constructor(private routeService:RoutesService) {

  }
  
  /*
   * initialize the app by getting all the 
   * available routes within the SF Muni
   */

  ngOnInit() {

    this.routeService.getRoutes().subscribe(routeObj => {
      // the returned route object has an array of routes and a copyright string
      // we just want the route array
      this.routes = routeObj.route;  
      
    });
  }
}
