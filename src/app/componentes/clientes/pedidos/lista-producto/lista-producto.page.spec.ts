import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaProductoPage } from './lista-producto.page';

describe('ListaProductoPage', () => {
  let component: ListaProductoPage;
  let fixture: ComponentFixture<ListaProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
