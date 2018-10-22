import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import  {HttpClientModule} from "@angular/common/http";
//Pages
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {LoginPageModule} from "../pages/login/login.module";
import {LocationsPageModule} from "../pages/locations/locations.module";
import {NotificationsPageModule} from "../pages/notifications/notifications.module";
import {ShoppingPageModule} from "../pages/shopping/shopping.module";
import {ProfilePageModule} from "../pages/profile/profile.module";
import { UserServiceProvider } from '../providers/user-service/user-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    //pages
    TabsPageModule,
    LoginPageModule,
    LocationsPageModule,
    NotificationsPageModule,
    ShoppingPageModule,
    ProfilePageModule,

    //Others
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
