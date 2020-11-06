import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  signInGoogle( token: string) {

    return this.http.post<any>(`${base_url}/login/google`, {access_token: token})
            .pipe(map(resp => {
              console.log(resp);
              return resp;
            }));
  }

  cargarProyectos() {
    const token = localStorage.getItem('GTOKEN');    
    return this.http.get(`${base_url}/proyectos?token=${token}`)
  }


  cargarDatos(id: string) {
    const token = localStorage.getItem('GTOKEN');    
    return this.http.post(`${base_url}/proyectos/datos?token=${token}`, { id });
  }

}
