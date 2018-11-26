import { VehicleService } from './vehicle.service'
import { IVehicleObj, IVehicle } from './vehicle.model'
import { Observable, of } from 'rxjs'

describe('VehicleService', () => {
    let vehicleService:VehicleService,
    mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        vehicleService = new VehicleService(mockHttp);
    })

    describe('get vehicles', () => {
        it('should return a list of vehicles for a route', () => {
            var vehicle:IVehicleObj = { 
                vehicle: [{
                    id: '156',
                    routeTag: 'E',
                
                }],
                lastTime: {
                    time: 0
                }
            };

            mockHttp.get.and.return(of(vehicle))

        })
    })
    

    
});