import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalizadosPage } from './finalizados.page';

describe('FinalizadosPage', () => {
  let component: FinalizadosPage;
  let fixture: ComponentFixture<FinalizadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
