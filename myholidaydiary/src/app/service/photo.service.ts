import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AlbumIdService } from './albumid.service';
import { environment } from 'src/environments/environment';

export const PHOTO_STORAGE = 'photos'
export const PHOTO_TABLE = 'photos'


@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    private supabase: SupabaseClient

    constructor(public albumIdService : AlbumIdService) {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    async uploadImage(filename:string, file:Blob, description:string, latitude:number, longitude:number) {
        const { data, error } = await this.supabase.storage
        .from(PHOTO_STORAGE)
        .upload('public/'+filename, file, { contentType: file.type })
        if (error) {
            console.log(error)
        }
        


        this.insertPhoto("https://unaelnolozfxzvvirfia.supabase.co/storage/v1/object/public/photos/public/"+filename, description, latitude, longitude)
    }
    async insertPhoto(pictureUrl:string, description:string, latitude:number, longitude:number) {
        const PhotoOfuser = {
            description: description,
            location: longitude + "," + latitude,
            albumId: this.albumIdService.getAlbumID(),
            pictureUrl: pictureUrl,
        }

        const { data, error } = await this.supabase
        .from(PHOTO_TABLE)
        .upsert([
            PhotoOfuser
        ])
    }

    async getPhotos() {
        const { data, error } = await this.supabase
        .from(PHOTO_TABLE)
        .select('*')
        .filter('albumId', 'eq', this.albumIdService.getAlbumID())
        return data
    }

    async deletePhoto(photoID : number) {
        const { data, error } = await this.supabase
        .from(PHOTO_TABLE)
        .delete()
        .match({ id: photoID })
    }

    async updateDescription(photoID : number, description : string) {
        const { data, error } = await this.supabase
        .from(PHOTO_TABLE)
        .update({ description: description })
        .match({ id: photoID })
    }
}