import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:string='';
  
  constructor(public navCtrl: NavController) {

    this.user = localStorage.getItem('user');
  }

}
