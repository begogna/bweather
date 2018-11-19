import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class WeatherServiceProvider {

  constructor(public http: HttpClient,
    private geolocation: Geolocation) {
    console.log('Hello WeatherServiceProvider Provider');
    this.localWeather();
  }

  baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
  key = "7df6ed6e5fb789f52f3902139cc4f10d";

  localWeather() {
    this.geolocation.getCurrentPosition().then((data => {
      let latitude = data.coords.latitude;
      let longitude = data.coords.longitude;
      console.log(latitude, ' ', longitude);
      let url = `${this.baseUrl}lat=${latitude}&lon=${longitude}&appid=${this.key}`;
      console.log("url ", url);
      console.log("get local weather ", this.http.get(url));
    }))


  }

  weatherByCity(city: string) {
    let url = `${this.baseUrl}q=${city}&appid=${this.key}`;
    let weather = this.http.get(url).map((res:Response)=>res).catch((error:any) => Observable.throw(error.error+ 'Server error'));;
    console.log("get weather in ", city, ": ", weather);
    return weather;
  }

}
