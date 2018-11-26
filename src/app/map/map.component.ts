import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { VehicleService } from '../vehicle/vehicle.service';
import { IVehicle } from '../vehicle/vehicle.model';
import { IRoute } from '../routes/route.model';
import { } from 'googlemaps';

const ZOOM = 13;
const INTERVAL:number = 15000;

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?key=';
const GOOGLE_KEY = 'AIzaSyAlBXBMMYoK8PddYF_iB87Uyu5wzur8fZI';

@Component({
    selector: 'bus-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})

/*
 * MapComponent
 * This component is responsible for the map and associated UI functions
 * including drawing/removing lines, markers and showing any infoWindows.
 * 
 * Note: The Google Maps API handles the resizing of the window.
 */ 
export class MapComponent implements OnInit,OnChanges {
    @Input() routes: IRoute[];
    @ViewChild('canvas') mapElement: any;
    map: google.maps.Map; 
    win;
    updating:boolean;
    main;

    //maintain a global list of markers and lines currently placed on the map
    markers:google.maps.Marker[] = [];
    lines:google.maps.Polyline[] = [];
    
    visibleRoutes:string[] = [];

    constructor(private vehiclesService:VehicleService) {
    }

    /*
     * ngOnInit: Draw the google map.  First time, we need to load the script,
     * and then draw the map AFTER the script has loaded.  Otherwise, we will be
     * attempting to draw the map without the script and the whole app will error.
     */
    ngOnInit() {
        var main = this;
        this.loadMapScript().then(function() {
            main.map = main.initMap(main.mapElement);
        });
    }

    /*
     * ngOnChange: Watching the Input of selected routes
     * 
     * When the list of selected routes changes, draw new routes
     * and refresh all vehiclees for routes newly selected and 
     * existing (meaning resetting the update timer on those already selected).
     * 
     * Finally, clean up any routes that are no longer selected
     */ 
    ngOnChanges() {
        
        //clear all lines because there is seemingly no way to add an identifier to a polyline
        //that would allow for them to be individually removed on a route-by-route basis.
        this.clearLines(); 
        
        var currentRoutes = [];    
        if (this.routes) {
            
            this.routes.forEach(r => {

                if (r.show) {
                    r.lastUpdated = r.lastUpdated || 0;

                    currentRoutes.push(r.tag);

                    this.drawRoute(r);
                    this.refreshRouteVehicles(r);
                }
            });

        }

        this.cleanUpInactiveRoutes(currentRoutes);
    }

    loadMapScript():Promise<any> {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = GOOGLE_URL + GOOGLE_KEY;
            script.onload = () =>{
                resolve();
            }
            document.getElementsByTagName('body')[0].appendChild(script);
        })
    }
    /*
    * initMap: Simple function to contain the creation of the google map
    */
    initMap(el) {
        
        var mapOptions = {
            streetViewControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                style:google.maps.ZoomControlStyle.SMALL
            },
            scrollwheel: false,
            center: new google.maps.LatLng(37.7749,-122.4194), //SF Center
            zoom: ZOOM,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          return new google.maps.Map(el.nativeElement, mapOptions);
    }

    /*
     * cleanUpInactiveRoutes: For routes that were once selected, we need to remove those 
     * markers and route lines from the map.
     */ 

    cleanUpInactiveRoutes(routes:string[]) {
        //having captured the current routes, let's update the visible routes being tracked
        var activeMarkers = [];
        for (var i = 0; i < this.markers.length; i++) {
            var label = this.markers[i].getLabel().text;
            if (routes.indexOf(label) < 0) {
                this.markers[i].setMap(null);
            } else {
                activeMarkers.push(this.markers[i]);
            }
        }
        this.markers = activeMarkers;
        
    } 

    /*****************************************************
     * Drawing map objects: routes (lines) and markers
     *****************************************************/

    /*
     * drawRoute: Translate route paths to lines and draw them on the map
     */
    drawRoute(route:IRoute) {
        route.path.forEach(p => {
            //need to translate 'lon' to 'lng'
            var path = p.point.map(pt => {
                return {
                    lat: +pt.lat,
                    lng: +pt.lon
                };
            });

            this.drawLine(path, route.color);
            
        });
    }

    /*
     * drawLine: Take a path array and the route color and add to the map
     */
    drawLine(path, color) {
        var line = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#' + color,
            strokeOpacity: 1,
            strokeWeight: 4
        });

        line.setMap(this.map);

        //add the line to the overall line array to be removed
        this.lines.push(line);
        
    }

    /*
     * drawMarker: Pin a marker on the map, add a clickable infoWindow popup and 
     * add the marker to the overall list of markers
     */
    drawMarker(v:IVehicle) {
        var m:google.maps.Marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(v.lat,v.lon),
            title: v.routeTag + ' ' + v.id,
            // tried icons, these do not look great
            // icon: {
            //     url: '/assets/images/bus.png'
            // },
            label: {
                text: v.routeTag || ' ' //in the case that a route tag is missing?
                 //this is the text color, if you look closely, but not always legible
                // color: '#' + route.color
            }
        });

        //add an info window for clicks
        this.addInfoWindow(m);

        //add the marker to the overall marker array
        this.markers.push(m);

    }

    /*
     * addInfoWindow: Add an infoWindow to a provided marker and add a click event
     * to the marker that shows the window associated to the marker, hides any existing 
     * popup windows and pan the map to be centered on the click
     */
    addInfoWindow(m:google.maps.Marker) {
        var main = this;
        var infoWindow = function () {
            // using the main reference that points to the parent <=> this
            if (main.win) {
                main.win.close();
            }
            
            main.win = new google.maps.InfoWindow({
                content: m.getTitle()
            });
            main.map.panTo(m.getPosition());
            main.win.open(main.map, m);

        };

        google.maps.event.addListener(m, 'click',infoWindow);
    }

    /*
     * updateRouteVehicles: Take an array of vehicles and then find those existing vehicles in 
     * the routes array of vehicles, or add the vehicle to the array if not found
     * 
     * TO DO: At some point, vehicles will likely be taken out of service and should therefore
     * be removed from the array.
     */
    updateRouteVehicles(updateArr, route:IRoute) {

        //take the entire update array and find those items in the existing vehicles
        updateArr.forEach(v => {
            //if update exists, but is not an array, will be a single vehicle object
            
            var ix = route.vehicles.findIndex(vehicle => {
                return vehicle.id === v.id;
            });
            
            if (ix > -1) {
                route.vehicles[ix] = v;
            } else {
                route.vehicles.push(v);
            }
            
        });

    }

    /*
     * refreshRouteVehicles: Given a route, fetch vehicles from the vehiclesService 
     * and update the vehicles on the map.
     * 
     * Recursively call the function based on the INTERVAL.
     */

    refreshRouteVehicles(route:IRoute) {
        this.updating = true; //signal to the UI that we are awaiting a call
        
        this.vehiclesService.getVehicles(route).subscribe(vehicleObj => {
            var update = vehicleObj.vehicle;

            route.lastUpdated = vehicleObj.lastTime.time;
            route.vehicles = route.vehicles || [];

            //make a reference to the root 'this' for use in listener functions
            var main = this;
            
            if (update) {

                //Debugging the API to see what is returned and the redraw required
                console.log('Updating route:', route.tag, '\tVehicles:', update.length);

                //Clear the markers for this specific route tag in order to redraw
                this.clearMarkers(route.tag); 

                //the service may return an array of vehicles or just a single vehicle object
                //make it into an array so we have one function for looking them up/adding
                if (!Array.isArray(update)) {
                    update = [update];
                } 

                this.updateRouteVehicles(update, route);
              
            } 
            //we place this outside of the update on the chance that a route was toggled
            //off and then on again, but there is no update.  There is a better way to solve
            //this that would reduced the number of markers being redrawn.

            //draw all the vehicles
            route.vehicles.forEach(v => {
                this.drawMarker(v);
            });

            this.updating = false; //update the UI to know we're done updating.

            if (route.timerId) {
                clearTimeout(route.timerId);
            }
            route.timerId = setTimeout(function() {
                // console.log('updating', route.tag, route.timerId);
                main.refreshRouteVehicles(route);

            }, INTERVAL);
        });
        
    }

    /*****************************************************
     * Clearing map objects: routes (lines) and markers
     *****************************************************/

    /* 
     * clearMarkers: Clear all the markers on the map
     *
     * OPTIONAL: Provide a route tag and only remove the markers for that route 
     */
    clearMarkers(routeTag?:string) {

        //maintain a list of markers that should remain in the case that a tag is provided

        var updatedMarkers = [];
        for (var i = 0; i < this.markers.length; i++) {
            if (routeTag) {
                var marker = this.markers[i].getLabel();
                //the title should be the start of the title string
                if (marker && marker.text.indexOf(routeTag) >= 0) {
                    this.markers[i].setMap(null);
                } else {
                    //marker did not match the tag, 'save' it to the updated array
                    updatedMarkers.push(this.markers[i]);
                }
            } else {
                this.markers[i].setMap(null);
            }
        }
        this.markers = updatedMarkers;
        
    }

    /*
     * clearLines: Remove all the lines on the map by setting the existing lines' map to null.
     * Then, re-init the array to empty.
     */
    clearLines() {
        for (var i = 0; i < this.lines.length; i++) {
            this.lines[i].setMap(null);
        }
        this.lines = [];
    }

    /* 
     * clearMap: A reset function.  Tie to a button to reset the map and cleanup all objects
     */
    clearMap() {
        this.clearLines();
        this.clearMarkers();
    }

    

}
