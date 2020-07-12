import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EncuestaPage } from './encuesta.page';

describe('EncuestaPage', () => {
  let component: EncuestaPage;
  let fixture: ComponentFixture<EncuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
