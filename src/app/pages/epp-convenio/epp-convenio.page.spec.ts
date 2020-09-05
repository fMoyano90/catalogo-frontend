import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EppConvenioPage } from './epp-convenio.page';

describe('EppConvenioPage', () => {
  let component: EppConvenioPage;
  let fixture: ComponentFixture<EppConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EppConvenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EppConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
