import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IRoute } from './route.model';

@Component({
    selector: 'bus-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss']
})
/*
 * RoutesListComponent
 * This component simply lists the routes (and manages the filtered list) and 
 * then notifies the LegendComponent when a route is toggled.
 */ 
export class RoutesListComponent implements OnChanges {
    @Input() routes: IRoute[];
    @Input() filterBy:string;
    @Input() open:boolean;

    @Output() routeToggle = new EventEmitter();

    filteredRoutes: IRoute[];
    
    constructor() { 

    }

    /*
    * ngOnChanges: Watch for changes specifically on the filterBy string, and update the list of
    * Routes by those matching the fuzzy search of the filter.
    */
    ngOnChanges() {
        if (this.routes && this.filterBy && this.filterBy.length > 0) {
            this.filterRoutesList();
        } else {
            this.filteredRoutes = this.routes;
        }
    }

    /* 
    * filterRoutesList: Filtering the list of routes by the provided string and showing only 
    * those routes that match the string
    */
    filterRoutesList() {
        this.filteredRoutes = this.routes.filter(r => {
            return r.title.indexOf(this.filterBy) >= 0;
        });
    }

    /*
    * toggleAll: Currently only clearing all routes from the UI
    * But this walks all the routes and turns them off.
    * Signal the update to the legend
    */
    toggleAll(select:boolean) {
        this.routes.forEach(route => {
            route.show = select;
            this.clearUpdate(select, route);
        });
        this.routeToggle.emit();
    }

    /*
    * toggleRoute: When toggling the route from visible on the map to not visible, or vice versa.
    * Handle the clearing of the update, and signal that a change has been made
    * to the selected route list by emitting an event.
    */
    toggleRoute(route:IRoute) {
        route.show = !route.show;
        
        //if the route was set to update, make sure it doesn't call the update and clear the handle
        this.clearUpdate(route.show, route);
        this.routeToggle.emit();
    }

    /*
    * clearUpdate: Some of the routes may have an update in progress if they were once active.
    * Using the process id (timerId), clear the timeout in progress.
    */
    clearUpdate(select:boolean, route:IRoute) {
        if (!select && route.timerId) {
            clearTimeout(route.timerId);
            route.timerId = null;
        }
    }

}
