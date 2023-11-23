import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Album } from '../data/album';
import { environment } from 'src/environments/environment';

export const ALBUM_TABLE = 'albums'
@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    private supabase: SupabaseClient

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    async getAlbums() {
        let { data, error } = await this.supabase
        .from(ALBUM_TABLE)
        .select('*')
        
        return data
    }
}