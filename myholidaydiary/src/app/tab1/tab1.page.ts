import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Album } from '../data/album';
import { AlbumService } from '../service/album.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { AlbumIdService } from '../service/albumid.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent],
})
export class Tab1Page implements OnInit{

  albums:  Array<Album> | null = []
  hasAlbums: boolean = false
  noAlbums: boolean = true
  albumID: number = 0;

  constructor(private albumService : AlbumService, public route : Router, public albumIdService : AlbumIdService) {
    addIcons({add});
  }

  ngOnInit() {
    this.loadAlbums()
  }

  nextpage() {
    this.route.navigate(['/tabs/tab3']);
  }

  loadAlbums() {
    this.albumService.getAlbums()
    .then(data => {
      if (data?.values != null) {
        this.albums = data
        this.hasAlbums = true
        this.noAlbums = false
      }
    })
  }

  async seeAlbum(albumName: string) {
    try {
      this.albumID = await this.albumService.getAlbumIDByName(albumName);
      this.albumIdService.setAlbumID(this.albumID);
      this.route.navigate(['/tabs/tab4']);
    } catch (error) {
      console.error(error);
    }
  }
}
