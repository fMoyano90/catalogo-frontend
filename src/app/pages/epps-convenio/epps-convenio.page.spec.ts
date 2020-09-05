import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EppsConvenioPage } from './epps-convenio.page';

describe('EppsConvenioPage', () => {
  let component: EppsConvenioPage;
  let fixture: ComponentFixture<EppsConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EppsConvenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EppsConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
