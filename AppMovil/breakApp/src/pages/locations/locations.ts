import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

bakeries: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {

  }

  ionViewDidLoad() {
    this.userService.getBakeries()
    .subscribe(
      (data)=>{
        console.log(data);
        this.bakeries = data['data'];
        console.log(this.bakeries);
      },
      (error)=>{
        console.error(error);
      }
    )
    console.log('ionViewDidLoad LocationsPage');
  }

}
