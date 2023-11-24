import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab3Page {
  darkmode: boolean = false;

  constructor(private darkModeService : DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  isDarkModeEnabled() {
    this.darkmode = this.darkModeService.isDarkModeEnabled();
    return this.darkModeService.isDarkModeEnabled();
  }
}
