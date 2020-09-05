import { Component, OnInit } from "@angular/core";
import { Producto } from "../../interfaces/interfaces";
import { ProductosService } from "../../services/productos.service";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

declare var window: any;

@Component({
  selector: "app-crear-epp",
  templateUrl: "./crear-epp.page.html",
  styleUrls: ["./crear-epp.page.scss"],
})
export class CrearEppPage implements OnInit {
  tempImages: string[] = [];

  producto: Producto = {
    material: "",
    descripcion: "",
    categoria: "",
    medida: "",
    genero: "",
  };

  actualizar: false;

  constructor(
    private productosService: ProductosService,
    private route: Router,
    private camera: Camera
  ) {}

  ngOnInit() {}

  async crearProducto() {
    console.log(this.producto);
    const creado = await this.productosService.crearProducto(this.producto);

    this.producto = {
      material: "",
      descripcion: "",
      categoria: "",
      medida: "",
      genero: "",
    };

    this.tempImages = [];

    this.route.navigateByUrl("/tabs/tab1");
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.procesarImagen(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.productosService.subirImagen(imageData);
        this.tempImages.push(img);
      },
      (err) => {
        // error
        console.log(err);
      }
    );
  }
}
