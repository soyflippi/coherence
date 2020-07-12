import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaMesaPage } from './alta-mesa.page';

describe('AltaMesaPage', () => {
  let component: AltaMesaPage;
  let fixture: ComponentFixture<AltaMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
