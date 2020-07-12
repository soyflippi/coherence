import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarPropinaPage } from './editar-propina.page';

describe('EditarPropinaPage', () => {
  let component: EditarPropinaPage;
  let fixture: ComponentFixture<EditarPropinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPropinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPropinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
