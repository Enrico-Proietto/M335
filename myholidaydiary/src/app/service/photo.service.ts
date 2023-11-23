import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    private supabase: SupabaseClient

    constructor() {
            this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    async uploadImage(file:File) {
        const { data, error } = await this.supabase.storage.from('photos').upload(file.name, file)
        if (error) {
            console.log(error)
            return
        }
        console.log(data)
          
    }
}