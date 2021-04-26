import { InjectionToken } from "@angular/core";
import {config} from '../config';
export class BaseConfigValues {
    get value(): Map<string,string> {
        return this._value;   
      }
      set value(val: Map<string,string>) {
       this._value = val;
      }
      private _value = config;
}
export const BASE_URL_VALUE_PROVIDER = new InjectionToken<BaseConfigValues>('')
