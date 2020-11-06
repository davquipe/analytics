import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public proyectos: any [] = [];
  public datos: any [] = [];

  exportAsConfig: ExportAsConfig  = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'hola', // the id of html/table element
  }
  

  constructor(
    private authService: SocialAuthService,
    private userService: AuthService,
    private exportAsService: ExportAsService,
  ) {}

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( resp => {
      console.log(resp);
      localStorage.setItem('GTOKEN', resp.authToken);
      this.userService.signInGoogle(resp.authToken).subscribe(resp => {
        // this.router.navigate([this.returnUrl]);
        this.cargarProyectos();
        console.log(resp);
      })
    })
  }


  cargarProyectos() {
    this.userService.cargarProyectos().subscribe((resp:any) => {
      console.log(resp.proyectos.data.items);
      this.proyectos = resp.proyectos.data.items;
    })
  }

  selecionarProyecto(id: any) {
    this.userService.cargarDatos(id).subscribe((resp: any) => {
      // console.log(resp.datos.data.reports[0].data.rows);
      resp.datos.data.reports[0].data.rows.forEach(view => {
        const datas = {
              dia: view.dimensions[0],  
							pais: view.dimensions[1], 
							ciudad: view.dimensions[2], 
							ruta_pagina: view.dimensions[3],
							prof_pagina: view.dimensions[4],
							palabra_clave: view.dimensions[5],
							fuente: view.dimensions.values[6],
							exito: view.metrics[0].values[0],
							sesiones: view.metrics[0].values[1],
							rebote: view.metrics[0].values[2],
							tarifa_entrada: view.metrics[0].values[3],
							tiempo_pagina: view.metrics[0].values[4],
							paginsv_sesion: view.metrics[0].values[5],
							objectivo_inicio: view.metrics[0].values[6],
							objectivo_completo: view.metrics[0].values[7],
							objectivo_convertido: view.metrics[0].values[8],
							objectivo_valor: view.metrics[0].values[9],
        }
        this.datos.push(datas)
        console.log('objectos',this.datos);
      });
    });
  }

  exportarExcel() {
    this.exportAsService.save(this.exportAsConfig, 'tucarreraperu').subscribe((resp) => {
      // save started
      console.log(resp);
      
    });
  }

}
