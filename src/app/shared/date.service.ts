import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  /**
   * Time to delay last seen for http request perpose
   */
  ONLINE_DELAY = 10; // 10s

  constructor() { }

  /**
   * Check if user timestamp is online
   * 
   * @param timestamp 
   */
  online(timestamp:number) : boolean {
    return (this.getCurrentTimestamp() - timestamp) > this.ONLINE_DELAY ? false : true;
  }

  lastSeen(timestamp:number) {
    const LAST_SEEN_SECONDS = this.getCurrentTimestamp() - timestamp;//(60*60*12)+(60*50);

    // online
    if(LAST_SEEN_SECONDS < this.ONLINE_DELAY) {
      return 'Online';
    }

    // minute
    if(LAST_SEEN_SECONDS <= 60) {
      return 'last seen 1 minute ago';
    }

    if(LAST_SEEN_SECONDS <= (60*60)) {
      const MINUTES = Math.floor(LAST_SEEN_SECONDS/60);
      return 'last seen ' + MINUTES + ' minutes ago.'; 
    }

    // three hour max
    if(LAST_SEEN_SECONDS < ( (60*60) * 4 )) {
      const HOUR = Math.floor(LAST_SEEN_SECONDS / (60*60) );
      const MINUTES = LAST_SEEN_SECONDS % (60*60);
      var lastSeen = 'last seen ' + HOUR + (HOUR > 1 ? ' hour ' : ' hours ');
      
      if(MINUTES > 0) {
        lastSeen += Math.floor(MINUTES/(60)) == 1 ? (Math.floor(MINUTES/60) + ' minute ') : (Math.floor(MINUTES/60) + ' minutes '); 
      }

      return lastSeen + 'ago';
    }

    // Today
    if(timestamp > this.getTodayTimestamp()) {
      return 'last seen Today at ';
    }

    if(LAST_SEEN_SECONDS <= ((60*60)*48)) {

    }

    // yesterday

    // date
    return ;
  }

  /**
   * Get browser current timestamp in seconds
   * 
   * @return UNIX TIMESTAMP
   */
  getCurrentTimestamp() {
    const DATE = new Date();
    return Math.floor(DATE.getTime()/1000);
  }

  /**
   * Get today timestamp(seconds) (12:00am)
   * 
   * @return an `Timestamp` in `Seconds`
   */
  getTodayTimestamp() {
    var time = new Date();

    // set time to 12:00am
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);

    return Math.floor(time.getTime()/1000);
  }

  /**
   * Get yesterday timestamp(seconds) (12:00am)
   * 
   * @return An `Timestamp` in `Seconds`
   */
  getYesterdatTimestamp() {
    var time = new Date();

    // set time to 12:00am
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);

    var day = time.getDate();

    // check if first day of month
    if(day == 1) {
      time.setDate(-1);
    } else {
      time.setDate(day-1);
    }
    
    return Math.floor(time.getTime()/1000);
  }

}
