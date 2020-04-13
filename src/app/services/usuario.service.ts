import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario, RespuestaUsuarios } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = null;
  userID: string = null;
  userUbicacion: string = null;
  userRole: string = null;
  private usuario: Usuario = {};
  paginaUsuarios = 0;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(rut: string, sap: string) {
    const data = { rut, sap };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe(async (resp) => {
        console.log(resp);
        if (resp['ok']) {
          await this.guardarToken(
            resp['token'],
            resp['userID'],
            resp['userUbicacion'],
            resp['userRole']
          );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    this.userID = null;
    this.userRole = null;
    this.userUbicacion = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/', { animated: true });
  }

  registro(usuario: Usuario) {
    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, usuario).subscribe((resp) => {
        if (resp['ok']) {
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }
  getUsuario(id: string) {
    return this.http.get<Usuario>(`${URL}/user/obtener/${id}`);
  }

  async guardarToken(
    token: string,
    userID: string,
    userUbicacion: string,
    userRole: string
  ) {
    this.token = token;
    this.userID = userID;
    this.userUbicacion = userUbicacion;
    this.userRole = userRole;
    await this.storage.set('token', token);
    await this.storage.set('userID', userID);
    await this.storage.set('userUbicacion', userUbicacion);
    await this.storage.set('userRole', userRole);

    await this.validaToken();
  }

  async cargarToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });

      this.http.get(`${URL}/user/`, { headers }).subscribe((resp) => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  getUsuarios(pull: boolean = false) {
    const headers = new HttpHeaders({
      'x-token': this.token,
    });

    if (pull) {
      this.paginaUsuarios = 0;
    }

    this.paginaUsuarios++;
    return this.http.get<RespuestaUsuarios>(
      `${URL}/user/all?pagina=${this.paginaUsuarios}`,
      { headers }
    );
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token,
    });

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/update`, usuario, { headers }).subscribe(
        (resp) => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  getBusqueda(busqueda: string, pull: boolean = false) {
    if (pull) {
      this.paginaUsuarios = 0;
    }
    this.paginaUsuarios++;
    return this.http.get<RespuestaUsuarios>(`${URL}/user/busqueda/${busqueda}`);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${URL}/user/delete-user/${id}`);
  }

  obtenerRole() {
    return this.storage.get('userRole') || null;
  }
}
