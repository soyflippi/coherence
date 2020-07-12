import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarProductoPage } from './editar-producto.page';

describe('EditarProductoPage', () => {
  let component: EditarProductoPage;
  let fixture: ComponentFixture<EditarProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
