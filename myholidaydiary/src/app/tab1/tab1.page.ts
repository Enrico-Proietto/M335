import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Album } from '../data/album';
import { AlbumService } from '../service/album.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private albumservice : AlbumService, public route : Router) {}

  ngOnInit() {
    this.loadAlbums()
  }

  nextpage() {
    this.route.navigate(['/tabs/tab3']);
  }

  loadAlbums() {
    this.albumservice.getAlbums()
    .then(data => {
      if (data?.values != null) {
        this.albums = data
        this.hasAlbums = true
        this.noAlbums = false
      }
    })
  }
}
