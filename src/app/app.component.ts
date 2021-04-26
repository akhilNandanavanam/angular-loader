import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { BaseApiService } from './services/base-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pre-loader';
  showloader: boolean = false; 
  response: string = '';
  constructor(private loader: LoaderService,
    private baseApiService: BaseApiService){}
  ngOnInit(){
    this.loader.getLoaderStatus().subscribe(status=>{
      this.showloader = status;
      console.log(this.showloader);
    });
    
  }
  btnClick(){
    this.baseApiService.get({route: '/todos/1'}).subscribe(res=>{
      this.response = JSON.stringify(res,null,4);
    });
  }
}
