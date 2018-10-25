import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/restService/restService';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  searchTerm: string = '';
   searchControl: FormControl;
bakeries: any[];
filteredBakeries: any[];
filteredBakeriesFull: any[];
options:string;

searching: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestServiceProvider, public loadingController: LoadingController,
   private launchNavigator : LaunchNavigator) {
this.options="explore";
this.searchControl = new FormControl();
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
        this.filteredBakeriesFull = Object.assign([], this.bakeries);
        console.log(this.bakeries);
        loader.dismiss();
        this.setFilteredItems();
     this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
     this.searching = false;
     this.setFilteredItems();
     });
      },
      (error)=>{
        console.error(error);
        loader.dismiss();
      }
    )

  }

  onSearchInput(){
   this.searching = true;
  }

  setFilteredItems() {
   this.filteredBakeries = this.filteredBakeriesFull.filter((item) => {
     console.log(item);
   return item.nombre.toLowerCase().indexOf(
     this.searchTerm.toLowerCase()) > -1;
   });
  }

  filterMenu(event){
//if(this.options!=event.value){
  //this.searchTerm="";
//}
    this.filteredBakeries=[];
    this.filteredBakeries = Object.assign([], this.bakeries);

    console.log(this.bakeries);
console.log("||||||")
console.log(this.filteredBakeries);
    if(event.value=='explore'){
      console.log("explore");

      //return;
    }

    if(event.value=='favorites'){
      console.log("favorites");
      this.filteredBakeries = this.filteredBakeries.filter((item)=>{
        return item.isFavorite;
      });
      //this.filterItems(this.searchTerm);
    //  return;
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
    //console.log(this.filteredBakeries);
    //this.filterItems(this.searchTerm);
    }
  this.filteredBakeriesFull = Object.assign([], this.filteredBakeries);
  this.setFilteredItems();

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

howToGo(event){
  console.log(event);
      let destino = event.latitud+', '+event.longitud;
      this.launchNavigator.navigate(destino)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
}
  rand(min: number, max: number): number {
         return (Math.random() * (max - min + 1) | 0) + min;
     }

     filterItems(searchTerm){
  return this.filteredBakeries.filter((item) => {
   return item.nombre.toLowerCase().indexOf(
     searchTerm.toLowerCase()) > -1;
   });
  }
}
