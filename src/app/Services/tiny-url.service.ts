import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TinyURLapiResponse } from '../Models/tiny-urlapi-response';
import { UrlLink } from '../Models/url-link';

@Injectable({
  providedIn: 'root'
})

export class TinyUrlService {

  baseApiUrl : string = environment.baseApiUrl;

    constructor(private http: HttpClient) { }

    getTinyUrl(longUrl: string, alias: string): Observable<TinyURLapiResponse>{
      const params = new HttpParams()
      .set('longUrl', longUrl)
      .set('alias', alias)
      .set('userId',1);

      console.log(longUrl);
      return this.http.post<TinyURLapiResponse>(this.baseApiUrl + `api/Home/getTinyUrl`, null, { params });
      }

      getUserData(userId: number): Observable<UrlLink[]>{
        const params = new HttpParams()
        .set('userId', userId);
  
        return this.http.get<UrlLink[]>(this.baseApiUrl + `api/Home/GetUserData`,{ params });
        }
}
