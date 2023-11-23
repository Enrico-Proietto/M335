import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CameraComponent]
})
export class Tab2Page {

  constructor() {}
}
