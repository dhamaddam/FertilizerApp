import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahTerasPage } from './keragaan-tanah-teras.page';

describe('KeragaanTanahTerasPage', () => {
  let component: KeragaanTanahTerasPage;
  let fixture: ComponentFixture<KeragaanTanahTerasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahTerasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahTerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
