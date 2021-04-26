import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { BaseApiService } from './services/base-api.service';
import { HttpClientModule } from '@angular/common/http';
import {BASE_URL_VALUE_PROVIDER, BaseConfigValues} from './services/base-url-provider';
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BaseApiService,
    { provide: 'BASE_URL_VALUE_PROVIDER', useClass: BaseConfigValues}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
