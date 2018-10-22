import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    console.log("Username: "+ this.username);
this.navCtrl.push('TabsPage');
    console.log("Password: "+ this.password);

  }
  showAlert(){
  const alert = this.alertCtrl.create({
    title: 'Muy Pronto',
    subTitle: 'En mantenimiento',
    buttons: ['OK']
    });
    alert.present();
}

}
