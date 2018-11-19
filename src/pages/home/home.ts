import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  ModalOptions,
  Modal
} from "ionic-angular";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [WeatherServiceProvider]
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    public navCtrl: NavController,
    private weatherService: WeatherServiceProvider,
    private modalController: ModalController,
    private storage: Storage
  ) {}

  private maPosition;
  private cities = new Array<any>();
  private imgWeather = "http://openweathermap.org/img/w/";

  ngOnInit() {

    // // get weather in current position
    // this.maPosition = this.weatherService.localWeather().subscribe(res => {
    //   this.maPosition = res;
    //   console.log("local weather ", res);
    // });


    // Fill the table of cities from the storage
    this.storage.get("cities").then(val => {
      console.log("The stored cities are", val);
      if (val) {
        this.cities = val;
      }
    });
  }

  ngOnDestroy() {
    // Before quiting store the cities
    console.log("Storing the cities ");
    this.storage.set("cities", this.cities);
  }

  openModalAddCity() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    // 'AddCityPage' with quotes => lazy loading
    const myModal: Modal = this.modalController.create("AddCityPage");

    myModal.present();

    myModal.onDidDismiss(data => {
      console.log("New input ", data);
      // Add the city to the table
      this.cities.push(data);

      // And store them for persistence
      this.storage.remove("cities");
      this.storage.set("cities", this.cities);
    });

    myModal.onWillDismiss(data => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }
}
