import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaEppConvenioPage } from './busqueda-epp-convenio.page';

describe('BusquedaEppConvenioPage', () => {
  let component: BusquedaEppConvenioPage;
  let fixture: ComponentFixture<BusquedaEppConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaEppConvenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaEppConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
