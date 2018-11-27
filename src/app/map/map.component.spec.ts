import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { HttpClientModule } from '@angular/common/http';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Needs to handle async loading
  // it('should have no visible routes', async(() => {
  //   const fixture = TestBed.createComponent(MapComponent);
  //   const map = fixture.debugElement.componentInstance;
  //   expect(map.visibleRoutes.length).toBe(0);
  // }));

});
