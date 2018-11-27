import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendComponent } from './legend.component';
import { FormsModule } from '@angular/forms';
import { RoutesListComponent } from '../routes/routes-list.component';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ LegendComponent,RoutesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(LegendComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').getAttribute('class')).toEqual('no-select');
  }));
});
