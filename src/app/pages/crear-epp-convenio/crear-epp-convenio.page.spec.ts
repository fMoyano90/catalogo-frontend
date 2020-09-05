import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearEppConvenioPage } from './crear-epp-convenio.page';

describe('CrearEppConvenioPage', () => {
  let component: CrearEppConvenioPage;
  let fixture: ComponentFixture<CrearEppConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEppConvenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearEppConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
