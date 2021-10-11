import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruteurComponent } from './recruteur.component';
import { RecruteurService } from '../../service/recruteur.service';

describe('RecruteurComponent', () => {
  let component: RecruteurComponent;
  let fixture: ComponentFixture<RecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruteurComponent ],
      providers:[
        {
          provide: RecruteurService, useValue: jasmine.createSpyObj('RecruteurService', ['getRecruteurs'])
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
