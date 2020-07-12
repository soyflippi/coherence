import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropinasPage } from './propinas.page';

describe('PropinasPage', () => {
  let component: PropinasPage;
  let fixture: ComponentFixture<PropinasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropinasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
