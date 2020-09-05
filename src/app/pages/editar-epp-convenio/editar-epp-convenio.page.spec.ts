import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarEppConvenioPage } from './editar-epp-convenio.page';

describe('EditarEppConvenioPage', () => {
  let component: EditarEppConvenioPage;
  let fixture: ComponentFixture<EditarEppConvenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEppConvenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarEppConvenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
