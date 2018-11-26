import { Component, OnInit, Input,Output } from '@angular/core';
import { IRoute,IRouteObj } from '../routes/route.model';

@Component({
  selector: 'bus-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})

/*
 * LegendComponent
 * This component is responsible for showing the list of available bus routes
 * in an expandable and contractible array left-menu component.
 * Contains: RoutesListComponent
 */ 
export class LegendComponent implements OnInit {
    @Input() routes:IRoute[];
    @Output() selectedRoutes:IRoute[];
    show:boolean;
    open: boolean;
    filterBy:string;

    constructor() { }

    /*
     * ngOnIt: start with the side panel in reduced mode
     */
    ngOnInit() {
        this.show = false; //hide the side panel
    }

    /*
     * toggleShow: expanding and contracting the left-menu pane.
     * Using a secondary boolean (open) to show the extended route titles
     * only once the left-menu pane is fully open
     */
    toggleShow() {
        this.show = !this.show;

        if (this.show) {
            setTimeout(() => {
                this.open = this.show;
            },300); //set to 3ms to match the CSS style
        } else {
            this.open = false;
        }
    }
    /* 
     * filterSelectedRoutes: show only the list of routes that match the fuzzy search
     * from the routes-list filter 
     */
    filterSelectedRoutes(data) {
        this.selectedRoutes = this.routes.filter((route:IRoute) => {
            return route.show;
        });
    }

    /*
     * clearFilter: remove the filter string and thus reset the filtered list of routes 
     */ 
    clearFilter() {
        if (this.filterBy && this.filterBy.length > 0) {
            this.filterBy = '';
        }
    }

}
