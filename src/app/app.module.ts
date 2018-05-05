import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
//database Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserProvider } from '../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { StorageProvider } from '../providers/storage/storage';
import { UploadPage } from '../pages/upload/upload';
import { PreloaderProvider } from '../providers/preloader/preloader';


export const firebaseConfig = {
  apiKey: "AIzaSyDrEgCdYbjfwBLNaSEj7nkWyTQkbG46ZMA",
  authDomain: "theme-app-b9976.firebaseapp.com",
  databaseURL: "https://theme-app-b9976.firebaseio.com",
  projectId: "theme-app-b9976",
  storageBucket: "theme-app-b9976.appspot.com",
  messagingSenderId: "954373264927",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Camera,
    StorageProvider,
    PreloaderProvider,
    LoadingController
  ]
})
export class AppModule {}
