import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  users: User[];
  user: User = {
    email: '',
    password: ''
  };
  notLoggedIn: boolean = true;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserService, private toastCtrl: ToastController,
    private menu: MenuController) {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      
    });
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  signIn(){
    for (var key in this.users) {
      var user = this.users[key];
      if (user.email == this.user.email && user.password == this.user.password) {
        this.presentToast('Logged in successefuly as ' + this.user.email);
        this.navCtrl.setRoot(HomePage);
        this.notLoggedIn = false;
      }
    }
    if (this.notLoggedIn) {
      this.presentToast('Oops! Your informations are not correct!');
    }
  }

  signUp(){
    this.navCtrl.push(RegisterPage);
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
