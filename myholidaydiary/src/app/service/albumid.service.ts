import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlbumIdService {
private albumID : number = 0

constructor() { }

setAlbumID(id : number) {
    this.albumID = id
}

getAlbumID() {
    return this.albumID
}
}