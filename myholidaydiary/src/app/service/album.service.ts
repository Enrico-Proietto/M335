import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

export const ALBUM_TABLE = "album"

@Injectable({
  providedIn: "root"
})

export class AlbumService {

    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    async getAlbums() {
        const { data } = await this.supabase
            .from(ALBUM_TABLE)
            .select("*")
       
        if (!data || data.length === 0) {
            return null
        }
        return data
    }

    async getAlbum(id: number) {
        const { data, error } = await this.supabase
            .from(ALBUM_TABLE)
            .select("*")
            .eq("id", id)
            .single()
        if (error) {
            throw error
        }
        return data
    }

    async getAlbumIDByName(albumName: string) {
        const { data, error } = await this.supabase
        .from(ALBUM_TABLE)
        .select("*")
        .filter("name", "eq", albumName)
        .single();


        if (error) {
            console.error('Error retrieving album:', error.message);
        }
        else {
            return data.id;
        }
    }

}

