import { HttpClient, HttpParams, } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { BaseConfigValues } from './base-url-provider';
import { map } from 'rxjs/operators';

interface QueryParams {
    [key: string]: string | number;
  }
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private _url: string = '';
  private _loaderTimeOut = 500;
  constructor(
      private http: HttpClient,
      @Inject('BASE_URL_VALUE_PROVIDER') private config: BaseConfigValues,
      private loader: LoaderService
  ) {
    this._url = this.config.value.get('BASE_URL')!;
    this._loaderTimeOut = parseInt(this.config.value.get('LOADER_TIMEOUT')!);
    console.table({
      "BASE_URL": this._url,
      "LOADER_TIMEOUT": this._loaderTimeOut
    }); 
   }
   get<U>({ route, params = {} }: { route: string; params?: QueryParams; }): Observable<U>{
       const queryParams = this.correctFormatForQueryUrl(params);
       return forkJoin<any,U>(
        [this.loader.triggerLoader(true, route),
        this.http.get<U>(
          this._url + route + queryParams
      )]).pipe(
        map(([loader, api])=>{
          setTimeout(()=>{
            this.loader.triggerLoader(false, route).subscribe(()=>{})
            },this._loaderTimeOut);
            return api;
          
        })
      );
   }
   post<T,U>({ route, params = {},data }: { route: string; params?: QueryParams;data: T }): Observable<U> {
    const queryParams = this.correctFormatForQueryUrl(params);
       return forkJoin<any,U>(
        [this.loader.triggerLoader(true, route),
          this.http.post<U>(
            this._url + route + queryParams,
            data
        )]).pipe(
        map(([loader, api])=>{
          setTimeout(()=>{
            this.loader.triggerLoader(false, route).subscribe(()=>{})
            },this._loaderTimeOut);
            return api;
          
        })
      );
   }
   put<T,U>({ route, params = {},data }: { route: string; params?: QueryParams;data: T }): Observable<U> {
    const queryParams = this.correctFormatForQueryUrl(params);
    return forkJoin<any,U>(
      [this.loader.triggerLoader(true, route),
        this.http.put<U>(
          this._url + route + queryParams,
          data,
      )]).pipe(
      map(([loader, api])=>{
        setTimeout(()=>{
          this.loader.triggerLoader(false, route).subscribe(()=>{})
          },this._loaderTimeOut);
          return api;
        
      })
    );
   }
   patch<T,U>({ route, params = {},data}: { route: string; params?: QueryParams;data: T}): Observable<U>{
    const queryParams = this.correctFormatForQueryUrl(params);
    return forkJoin<any,U>(
      [this.loader.triggerLoader(true, route),
        this.http.patch<U>(
          this._url + route + queryParams,
          data
      )]).pipe(
      map(([loader, api])=>{
        setTimeout(()=>{
          this.loader.triggerLoader(false, route).subscribe(()=>{})
          },this._loaderTimeOut);
          return api;
        
      })
    );
   }
   delete<U>({ route, params = {} }: { route: string; params?: QueryParams;}): Observable<U>{
    const queryParams = this.correctFormatForQueryUrl(params);
    return forkJoin<any,U>(
      [this.loader.triggerLoader(true, route),
        this.http.delete<U>(
          this._url + route + queryParams
      )]).pipe(
      map(([loader, api])=>{
        setTimeout(()=>{
          this.loader.triggerLoader(false, route).subscribe(()=>{})
          },this._loaderTimeOut);
          return api;
        
      })
    );
   }
   // logic for creating query params
   private correctFormatForQueryUrl(qp: QueryParams): string {
    if (this.isNull(qp)) {
      return '';
    }
    const qpAsStr = this.mapQueryParamsToUrl(qp);
    return qpAsStr.length === 0 ? '' : `?${qpAsStr.join('&')}`;
  }
  private isNull(value:QueryParams){
      if(value != null) return true;
      return false;
  }
  private mapQueryParamsToUrl(qp: QueryParams){
      return Object.keys(qp).map((key: string)=> {
          return `${key}=${qp[key]}`;
      })
  }

}
