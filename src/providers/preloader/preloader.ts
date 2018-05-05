import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PreloaderProvider Provider');
  }

}
