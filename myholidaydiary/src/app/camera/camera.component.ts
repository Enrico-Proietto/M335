import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CommonModule } from '@angular/common'
import { Geolocation } from '@capacitor/geolocation';
import { GeolocatorService } from '../service/geolocator.service';
import { PhotoService } from '../service/photo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CameraComponent {
  public photos: Photo[] = [];

  description: string = '';
  imageUrl: string | undefined;
  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0
  newImage : Photo = {
    webPath: '', format: '', exif: null, base64String: '', path: '', dataUrl: '',
    saved: false
  }

  constructor(public geolocationService : GeolocatorService, public photoService : PhotoService) { }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    })
    this.newImage = image
    this.imageUrl = image.dataUrl;
    this.getCurrentPosition()
  }

  resetPicture () {
    this.imageUrl = ''
  }

  savePicture = async () => {
    const testblob = await fetch(this.newImage.path!).then(r => r.blob()) 
    const uploadImage = this.photoService.uploadImage("image_"+Date.now()+".jpg", testblob, this.description, this.latitude, this.longitude)
    this.getCurrentPosition();
    // uploadImage
  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition();

    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.altitude = position.coords.altitude;
  }
}

