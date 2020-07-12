import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirProductosPage } from './pedir-productos.page';

describe('PedirProductosPage', () => {
  let component: PedirProductosPage;
  let fixture: ComponentFixture<PedirProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirProductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
