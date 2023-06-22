import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewKeragaanLahanPage } from './view-keragaan-lahan.page';

describe('ViewKeragaanLahanPage', () => {
  let component: ViewKeragaanLahanPage;
  let fixture: ComponentFixture<ViewKeragaanLahanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKeragaanLahanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewKeragaanLahanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
