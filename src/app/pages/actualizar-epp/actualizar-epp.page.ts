import { Component, OnInit } from "@angular/core";
import { Producto } from "../../interfaces/interfaces";
import { ProductosService } from "../../services/productos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

declare var window: any;

@Component({
  selector: "app-actualizar-epp",
  templateUrl: "./actualizar-epp.page.html",
  styleUrls: ["./actualizar-epp.page.scss"]
})
export class ActualizarEppPage implements OnInit {
  tempImages: string[] = [];

  producto: Producto = {
    material: "",
    descripcion: "",
    categoria: "",
    medida: "",
    genero: ""
  };

  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private camera: Camera
  ) {
    this.obtenerEpp();
  }

  ngOnInit() {}

  async actualizarProducto(id) {
    const actualizado = await this.productosService.actualizarProducto(
      this.producto,
      id
    );
    
    console.log(this.producto, id);
    this.producto = {
      material: "",
      descripcion: "",
      categoria: "",
      medida: "",
      genero: ""
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
      sourceType: this.camera.PictureSourceType.CAMERA
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
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      imageData => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.productosService.subirImagen(imageData);
        this.tempImages.push(img);
      },
      err => {
        // error
        console.log(err);
      }
    );
  }

  obtenerEpp() {
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.productosService.getProducto(id).subscribe(
        resp => {
          this.producto = resp["producto"];
        },
        error => console.log(error)
      );
    });
  }
}
