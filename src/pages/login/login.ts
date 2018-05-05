import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { User } from '../../models/User';
import { ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';

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
    private userProvider: UserProvider, private toastCtrl: ToastController,
    private menu: MenuController) {
    this.userProvider.getUsers().subscribe(users => {
      this.users = users;
    });
    this.user.email = this.navParams.get('email');
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
        localStorage.setItem('user', this.user.email);
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
