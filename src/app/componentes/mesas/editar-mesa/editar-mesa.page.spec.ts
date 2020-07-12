import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarMesaPage } from './editar-mesa.page';

describe('EditarMesaPage', () => {
  let component: EditarMesaPage;
  let fixture: ComponentFixture<EditarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
