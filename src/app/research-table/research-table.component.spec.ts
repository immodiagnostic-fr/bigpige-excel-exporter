import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchTableComponent } from './research-table.component';

describe('ResearchTableComponent', () => {
  let component: ResearchTableComponent;
  let fixture: ComponentFixture<ResearchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
