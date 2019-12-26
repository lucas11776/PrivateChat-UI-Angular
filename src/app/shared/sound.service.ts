import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  notificationAudio = new Audio('assets/audio/notification.mp3');

  constructor() { }

  /**
   * Play notification audio track
   */
  notification() {
    this.notificationAudio.play();
  }

}
