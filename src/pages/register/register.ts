import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../../models/User';
import { Observable } from 'rxjs/observable';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    createdAt: new Date().toLocaleDateString()
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _db: AngularFirestore, private toastCtrl: ToastController,
    private menu: MenuController) {
    this.usersCollection = this._db.collection("users");
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  register() {
    this.usersCollection.add(this.user)
    .then(result => {
      this.presentToast('Registred successefuly');
      this.navCtrl.setRoot(LoginPage,{email:this.user.email});
    })
    .catch(error =>{
      this.presentToast(error);
    });
    
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
