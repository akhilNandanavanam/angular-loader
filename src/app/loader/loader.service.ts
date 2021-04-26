import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader: Subject<boolean> = new Subject();
  requestCount: Map<string,boolean>;
  constructor() {
    this.requestCount = new Map<string,boolean>();
   }
  triggerLoader(value: boolean, route: string){
    return new Observable((subscriber)=>{
      if(this.checkRequest(route)){
      } else {
        this.requestCount.set(route, value);
      }
      this.checkResponses();
      subscriber.next();      
      subscriber.complete();
    });
  }
  getLoaderStatus(){
    return this.showLoader;
  }
  checkRequest(route: string): boolean{
    if(this.requestCount.get(route)) return true;
    return false;
  }
  checkResponses(){
    let count = 0;
    this.requestCount.forEach(request => {
      if(request.valueOf() == false) count ++;
    });
    if(count == this.requestCount.size - 1){
      this.requestCount = new Map();
      this.showLoader.next(true);
    } else {
      this.showLoader.next(false);
    }
  }
}
