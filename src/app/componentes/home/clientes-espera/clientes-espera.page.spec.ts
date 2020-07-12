import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientesEsperaPage } from './clientes-espera.page';

describe('ClientesEsperaPage', () => {
  let component: ClientesEsperaPage;
  let fixture: ComponentFixture<ClientesEsperaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesEsperaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesEsperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
