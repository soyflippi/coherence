import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MozoPage } from './mozo.page';

describe('MozoPage', () => {
  let component: MozoPage;
  let fixture: ComponentFixture<MozoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
