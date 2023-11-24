import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocatorService {

  constructor() { }

  public async getCurrentPosition () {

    await Geolocation.requestPermissions();
    
    const coordinates = await Geolocation.getCurrentPosition();

    return coordinates;

  }

  
}