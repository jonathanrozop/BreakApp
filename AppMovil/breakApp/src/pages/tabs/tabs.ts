import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  notificationsRoot = 'NotificationsPage';
  locationsRoot = 'LocationsPage';
  shoppingRoot = 'ShoppingPage';
  profileRoot = 'ProfilePage';
  selectTab = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {}

}
