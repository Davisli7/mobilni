import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.initializeEdgeToEdge();
  }

  private async initializeEdgeToEdge() {
    if (Capacitor.getPlatform() === 'android') {
      try {
        await EdgeToEdge.enable();

        await EdgeToEdge.setBackgroundColor({ color: '#00000000' });
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: Style.Default });

        console.log('Edge-to-edge zapnutý – kliknutí na tabs by mělo fungovat');
      } catch (error) {
        console.error('Chyba při zapínání edge-to-edge:', error);
      }
    }
  }
}