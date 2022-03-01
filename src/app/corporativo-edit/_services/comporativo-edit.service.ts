import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporativoEditService {
  private _apiCorporativo: string;
  private _apiContactos: string;
  private _headers: HttpHeaders;
  options: any;


  constructor(private readonly _http: HttpClient) {
    this._apiCorporativo = `${environment.apiURL}/corporativos`;
    this._apiContactos = `${environment.apiURL}/contactos`;
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('tokenscloud')}`
    });
  }

  public obtenerCorporativo(id: string): Observable<any> {
    return this._http.get<any>(`${this._apiCorporativo}/${id}`, { headers: this._headers });
  }

  public agregarContacto(body: any): Observable<any> {
    return this._http.post<any>(this._apiContactos, body, { headers: this._headers });
  }

  public actualizarContacto(id: string, body: any): Observable<any> {
    return this._http.put<any>(`${this._apiContactos}/${id}`, body, { headers: this._headers });
  }

  public eliminarContacto(id: string): Observable<any> {
    return this._http.delete<any>(`${this._apiContactos}/${id}`, { headers: this._headers });
  }
}
