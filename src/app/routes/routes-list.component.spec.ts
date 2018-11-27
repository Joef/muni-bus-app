import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesListComponent } from './routes-list.component';
import { FormsModule } from '@angular/forms';

describe('RoutesListComponent', () => {
  let component: RoutesListComponent;
  let fixture: ComponentFixture<RoutesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ RoutesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
