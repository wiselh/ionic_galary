import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/User';
import { Observable } from 'rxjs/observable';

@Injectable()
export class UserProvider {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(public _db: AngularFirestore, public toastCtrl: ToastController) {

    _db.firestore.settings({ timestampsInSnapshots: true });
    this.usersCollection = _db.collection("users");
    this.users = _db
      .collection("users")
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      });
  }
  getUsers() {
    return this.users;
  }
  addUser(user: User) {
    this.usersCollection.add(user).then(() => {
      this.presentToast('User was added successfully');
    }).catch(errors => {
      this.presentToast(errors);
    });
  }
  updateUser(user: User) {
    this.userDoc = this._db.doc(`/users/${user.id}`);
    this.userDoc.update(user).then(() => {
      this.presentToast('User has been updated successfully');
    }).catch(errors => {
      this.presentToast(errors);
    });;
  }
  deleteUser(user: User) {

    this.userDoc = this._db.doc(`/users/${user.id}`);
    this.userDoc.delete().then(() => {
      this.presentToast('User has been deleted successfully');
    }).catch(errors => {
      this.presentToast(errors);
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
