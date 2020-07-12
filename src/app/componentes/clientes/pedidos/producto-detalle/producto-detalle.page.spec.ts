import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductoDetallePage } from './producto-detalle.page';

describe('ProductoDetallePage', () => {
  let component: ProductoDetallePage;
  let fixture: ComponentFixture<ProductoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
