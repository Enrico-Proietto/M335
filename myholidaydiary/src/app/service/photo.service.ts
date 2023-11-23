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
        .upload('public/'+filename, file)
        if (error) {
            console.log(error)
        }
    
        this.insertPhoto(filename, description, latitude, longitude)
    }
    async insertPhoto(pictureUrl:string, description:string, latitude:number, longitude:number) {
        const PhotoOfuser = {
            description: description,
            location: longitude + "," + latitude,
            albumId: 2,
            pictureUrl: pictureUrl,
        }

        const { data, error } = await this.supabase
        .from(PHOTO_TABLE)
        .upsert([
            PhotoOfuser
        ])
    }
}