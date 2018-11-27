import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LegendComponent } from './legend/legend.component';
import { MapComponent } from './map/map.component';
import { RoutesListComponent } from './routes/routes-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        MapComponent,
        LegendComponent,
        RoutesListComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
