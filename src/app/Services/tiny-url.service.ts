import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BitlyShortenResponse } from '../Models/bitly-shorten-response';

@Injectable({
  providedIn: 'root'
})

export class TinyUrlService {

  baseApiUrl : string = environment.baseApiUrl;

    constructor(private http: HttpClient) { }

    getTinyUrl(longUrl: string, alias: string): Observable<BitlyShortenResponse>{
      const params = new HttpParams()
      .set('longUrl', longUrl)
      .set('alias', alias);

      console.log(longUrl);
      return this.http.post<BitlyShortenResponse>(this.baseApiUrl + `api/Home/getTinyUrl`, null, { params });
      }
}
