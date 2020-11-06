import { Component } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public proyectos: any [] = [];
  constructor(
    private authService: SocialAuthService,
    private userService: AuthService
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
    this.userService.cargarDatos(id).subscribe(resp => {
      console.log(resp);
    });
  }

}
