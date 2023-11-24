import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, create } from 'ionicons/icons';
import { PhotoService } from '../service/photo.service';
import { PhotoOfuser } from '../data/photo';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { atOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab4Page implements OnInit {
  listOfPhotos : PhotoOfuser[] | null = []
  newDescription : string = ""
  editPhotoID : number = 0
  @ViewChild(IonModal) modal: IonModal | undefined;

  constructor(public route : Router, public photoService : PhotoService) {
    addIcons({add, create});
   }

  ngOnInit() {
    this.loadphotos()
  }

  loadphotos() {
    this.photoService.getPhotos().then(data => {
      if (data?.values != null) {
        this.listOfPhotos = data
      }
    })
  }

  deletePhoto(photoID : number) {
    this.photoService.deletePhoto(photoID)
    this.loadphotos()
    this.route.navigate(['/tabs/tab1']);
  }

  updatePhoto(photoID: number, description: string) {
    this.photoService.updateDescription(photoID, description);
  }

  nextpage() {
    this.route.navigate(['/tabs/tab2']);
  }

  cancel() {
    if (this.modal) {
      this.modal.dismiss(null, 'cancel');
    }
  }

  confirm() {
    if (this.modal) {
      this.modal.dismiss(this.newDescription, 'confirm');
    }
    this.updatePhoto(this.editPhotoID, this.newDescription)
  }
  setEditedPhotoID(photoID : number) {
    this.editPhotoID = photoID
  }

  onWillDismiss(event : Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if(ev.detail.role === 'confirm') {
      this.updatePhoto(this.editPhotoID, this.newDescription)
    }
    this.loadphotos()
  }
}
