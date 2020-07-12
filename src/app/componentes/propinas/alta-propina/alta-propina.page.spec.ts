import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaPropinaPage } from './alta-propina.page';

describe('AltaPropinaPage', () => {
  let component: AltaPropinaPage;
  let fixture: ComponentFixture<AltaPropinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPropinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaPropinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
