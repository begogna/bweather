import { Component, ViewChild } from "@angular/core";
import { IonicPage, ViewController } from "ionic-angular";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";

@IonicPage()
@Component({
  selector: "page-add-city",
  templateUrl: "add-city.html"
})
export class AddCityPage {

  @ViewChild('inputCity') inputCity;
  constructor(
    private view: ViewController,
    private weatherService: WeatherServiceProvider
  ) {
  }


  city: string;
  weather;

  ngAfterViewChecked() {
    this.inputCity.setFocus()
}

  closeModal() {
    console.log(this.city);
    // Call the weather service and send the json if there is one
    this.weatherService.weatherByCity(this.city).subscribe((res) => {
      this.weather = res;
      // this.imgWeather = "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
      console.log(this.weather);
      this.view.dismiss(this.weather);
    });



  }
}
