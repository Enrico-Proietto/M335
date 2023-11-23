import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { CommonModule } from '@angular/common'
import { Geolocation } from '@capacitor/geolocation';
import { GeolocatorService } from '../service/geolocator.service';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule,]
})
export class CameraComponent {
  public photos: Photo[] = [];

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
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    this.newImage = image
    this.imageUrl = image.webPath;
    this.getCurrentPosition()
  }

  resetPicture () {
    this.imageUrl = ''
  }

  savePicture = async () => {
    const imageFileURi = this.newImage.path;
    const response = await fetch(imageFileURi!);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type, lastModified: Date.now() });
    const uploadImage = this.photoService.uploadImage;
    const imageUrl = await uploadImage(file);
    this.getCurrentPosition()
  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition();

    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.altitude = position.coords.altitude;
  }
}

