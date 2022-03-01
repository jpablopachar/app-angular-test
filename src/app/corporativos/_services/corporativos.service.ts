import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CorporativosResponse } from '../_models/corporativos-response';

@Injectable({
  providedIn: 'root'
})
export class CorporativosService {
  private _apiLogin: string;
  private _headers: HttpHeaders;
  options: any;


  constructor(private readonly _http: HttpClient) {
    this._apiLogin = `${environment.apiURL}/corporativos`;
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('tokenscloud')}`
    });
  }

  public obtenerCorporativos(): Observable<CorporativosResponse> {
    return this._http.get<CorporativosResponse>(this._apiLogin, { headers: this._headers });
  }
}
