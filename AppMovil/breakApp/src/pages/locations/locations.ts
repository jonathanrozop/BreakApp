import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/restService/restService';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

bakeries: any[];
filteredBakeries: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestServiceProvider, public loadingController: LoadingController) {
this.options="explore";
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Cargando"
    })
    loader.present();
    this.restService.getBakeries()
    .subscribe(
      (data)=>{
        console.log(data);
        let temp1 = data['data'];
        this.bakeries=[];
        for(let i=0; i<temp1.length;i++){
          let varTemp = temp1[i];
          varTemp.isFavorite = false;
          varTemp.score = this.rand(1,5);
          this.bakeries.push(varTemp);
        }

        this.filteredBakeries = Object.assign([], this.bakeries);
        console.log(this.bakeries);
        loader.dismiss();
      },
      (error)=>{
        console.error(error);
        loader.dismiss();
      }
    )
  }

  filterMenu(event){
    this.filteredBakeries=[];
    this.filteredBakeries = Object.assign([], this.bakeries);

    if(event.value=='explore'){
      console.log("explore");
      return;
    }

    if(event.value=='favorites'){
      console.log("favorites");
      this.filteredBakeries = this.filteredBakeries.filter((item)=>{
        return item.isFavorite;
      });
      return;
    }

    if(event.value=='score'){
      console.log("score");
      this.filteredBakeries = this.filteredBakeries.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
    }
  }

  changeFavoriteStatus(bakery: any){
    console.log(bakery);
    bakery.isFavorite= !bakery.isFavorite;
    this.showUpdatedItem(bakery);
  }

  showUpdatedItem(newItem){
    let index = this.bakeries.indexOf(newItem);
    console.log(index);
    this.bakeries[index] = newItem;
  }

  rand(min: number, max: number): number {
         return (Math.random() * (max - min + 1) | 0) + min;
     }
}
