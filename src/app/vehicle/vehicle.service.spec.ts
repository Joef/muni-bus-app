import { VehicleService } from './vehicle.service'
import { IVehicleObj, IVehicle } from './vehicle.model'
import { IRoute } from '../routes/route.model'
import { Observable, of } from 'rxjs'

describe('VehicleService', () => {
    let vehicleService:VehicleService,
    mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
        vehicleService = new VehicleService(mockHttp);
    })

    describe('get vehicles', () => {
        it('should call the api', () => {
            var route = { 
                title: 'test',
                tag: 'N',
                lastUpdated: 0,
                vehicles: []
            };
                
            mockHttp.get.and.returnValue(of(false))
            vehicleService.getVehicles(<IRoute>route)

            //expect(route.vehicles.length).toBe(0);
            expect(mockHttp.get).toHaveBeenCalledWith('http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=N&t=0')
        })
    })
    

    
});