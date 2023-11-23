import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: "root",
})
export class DarkModeService {
    private isDarkMode = false;

    constructor(private storage: Storage) {
        this.loadDarkMode();
    }
    
    async ngOnInit() {
        await this.storage.create();
      }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.storage.set("darkMode", this.isDarkMode);
        document.body.classList.toggle("dark", this.isDarkMode);
    }

    private async loadDarkMode() {
        const darkMode = await this.storage.get("darkMode");
        this.isDarkMode = darkMode || false;
        document.body.classList.toggle("dark", this.isDarkMode);
    }

    isDarkModeEnabled() {
        return this.isDarkMode;
    }
}