import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, Solicitud } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { SolicitudesService } from '../../services/solicitud.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-verano',
  templateUrl: './solicitud-verano.page.html',
  styleUrls: ['./solicitud-verano.page.scss'],
})
export class SolicitudVeranoPage implements OnInit {
  public usuario: any = {};
  public solicitud: Solicitud = {
    usuarioID: '',
    nombre: '',
    rut: '',
    sap: '',
    funcion: '',
    ubicacion: '',
    epp1: '',
    tall1: '',
    epp2: '',
    tall2: '',
    epp3: '',
    tall3: '',
    epp4: '',
    tall4: '',
    epp5: '',
    tall5: '',
    epp6: '',
    tall6: '',
    epp7: '',
    tall7: '',
    epp8: '',
    tall8: '',
    epp9: '',
    tall9: '',
    epp10: '',
    tall10: '',
    epp11: '',
    tall11: '',
    epp12: '',
    tall12: '',
    epp13: '',
    tall13: '',
    epp14: '',
    tall14: '',
    epp15: '',
    tall15: '',
    temporada: '',
    mes: null,
    anio: null,
  };

  public userID: string;
  public tallasZapatos: number[] = [];
  public tallasBuzos: number[] = [];
  public tallas: string[];
  public tallas2: string[];

  constructor(
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudesService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private route: Router
  ) {
    this.obtenerID().then((resp) => {
      this.userID = resp;
    });
    this.obtenerTallasZapatos();
    this.obtenerTallasBuzos();
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.tallas = ['S', 'M', 'L', 'XL', 'XXL'];
    this.tallas2 = ['S', 'M', 'L', 'XL'];
  }

  async obtenerID() {
    return await this.storage.get('userID');
  }

  // Obtener usuario por ID
  async obtenerUsuario() {
    const id = await this.obtenerID();

    this.usuarioService.getUsuario(id).subscribe((params) => {
      // tslint:disable-next-line: no-string-literal
      this.usuario = params['usuario'];
      console.log(this.usuario);
    });
  }

  // Crear solicitud
  async enviarSolicitud() {
    const date = new Date();
    const anio = date.getFullYear();
    const mes = date.getMonth();
    // MANEJAR LA DATA DE LA SOLICITUD

    this.solicitud.usuarioID = this.userID;
    this.solicitud.nombre = this.usuario.nombre;
    this.solicitud.rut = this.usuario.rut;
    this.solicitud.sap = this.usuario.sap;
    this.solicitud.funcion = this.usuario.funcion;
    this.solicitud.ubicacion = this.usuario.div_pers;
    this.solicitud.temporada = 'VERANO';
    this.solicitud.anio = anio;
    this.solicitud.mes = mes;

    switch (this.usuario.div_pers) {
      case 'MINA RAJO':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        this.solicitud.epp2 = 'BUZO PILOTO';
        this.solicitud.epp3 = 'CAMISA SLACK';
        this.solicitud.epp4 = 'PANTALON SLACK';
        this.solicitud.epp5 = 'BANDANA';
        break;

      case 'Mina Subterr.':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        this.solicitud.epp2 = 'BUZO PILOTO ANTIGRASA';
        this.solicitud.epp3 = 'BUZO PILOTO';
        this.solicitud.epp4 = 'CAMISA SLACK';
        this.solicitud.epp5 = 'PANTALON SLACK';
        this.solicitud.epp6 = 'BANDANA';
        break;

      case 'Concentrador':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD SIN CHIPORRO';
        this.solicitud.epp2 = 'BUZO PILOTO ANTIGRASA';
        this.solicitud.epp3 = 'BUZO PILOTO';
        this.solicitud.epp4 = 'CAMISA SLACK';
        this.solicitud.epp5 = 'PANTALON SLACK';
        this.solicitud.epp6 = 'BANDANA';
        break;

      case 'Plan.Fil. A.Ind':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        this.solicitud.epp2 = 'CAMISA ANTIACIDO';
        this.solicitud.epp3 = 'PANTALON ANTIACIDO';
        this.solicitud.epp4 = 'BANDANA';
        break;

      case 'Saladillo':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        this.solicitud.epp2 = 'CAMISA ANTIACIDO';
        this.solicitud.epp3 = 'PANTALON ANTIACIDO';
        this.solicitud.epp4 = 'BANDANA';
        break;

      case 'Los Andes':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        break;

      case 'Huechun A.Ind.':
        this.solicitud.epp1 = 'ZAPATO DE SEGURIDAD VERANO';
        this.solicitud.epp2 = 'CAMISA SLACK';
        this.solicitud.epp3 = 'PANTALON SLACK';
        this.solicitud.epp4 = 'BANDANA';
        break;
    }

    console.log(this.solicitud);
    const creado = await this.solicitudService.enviarSolicitud(this.solicitud);

    // LIMPIAR SOLICITUD
    this.solicitud = {
      usuarioID: '',
      nombre: '',
      rut: '',
      sap: '',
      funcion: '',
      ubicacion: '',
      epp1: '',
      tall1: '',
      epp2: '',
      tall2: '',
      epp3: '',
      tall3: '',
      epp4: '',
      tall4: '',
      epp5: '',
      tall5: '',
      epp6: '',
      tall6: '',
      epp7: '',
      tall7: '',
      epp8: '',
      tall8: '',
      epp9: '',
      tall9: '',
      epp10: '',
      tall10: '',
      epp11: '',
      tall11: '',
      epp12: '',
      tall12: '',
      epp13: '',
      tall13: '',
      epp14: '',
      tall14: '',
      epp15: '',
      tall15: '',
      temporada: '',
      mes: null,
      anio: null,
    };

    this.route.navigateByUrl('/tabs/tab1');
  }

  obtenerTallasZapatos() {
    for (let i = 38; i <= 46; i++) {
      this.tallasZapatos.push(i);
    }
  }
  obtenerTallasBuzos() {
    for (let i = 44; i <= 56; i += 2) {
      this.tallasBuzos.push(i);
    }
  }
}
