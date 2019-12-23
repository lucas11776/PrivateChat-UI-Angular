import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  /**
   * Time to delay last seen for http request perpose
   */
  ONLINE_DELAY = 15; // 10s

  monthsOfYear = ['January','February','March','April','May','June','July','August','September','October','November', 'December'];

  dateOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  constructor() { }

  /**
   * Check if user timestamp is online
   * 
   * @param timestamp 
   */
  online(timestamp:number) : boolean {
    return (this.getCurrentTimestamp() - timestamp) > this.ONLINE_DELAY ? false : true;
  }

  /**
   * Convert `timestamp` to readable time
   * 
   * @param timestamp
   * @return An `Date` of user last seen 
   */
  lastSeen(timestamp:number) {
    const LAST_SEEN_SECONDS = this.getCurrentTimestamp() - timestamp;
    const TIME = new Date(timestamp*1000);

    if(timestamp == null) {
      return '';
    }

    // Online
    if(LAST_SEEN_SECONDS < this.ONLINE_DELAY) {
      return 'Online';
    }

    // Seconds
    if(LAST_SEEN_SECONDS < 60) {
      return 'last seen ' + LAST_SEEN_SECONDS + (LAST_SEEN_SECONDS == 1 ? ' second ' : ' seconds ') + ' ago.';
    }

    // Minutes
    if(LAST_SEEN_SECONDS <= (60*2)) {
      return 'last seen 1 minute ago';
    }

    if(LAST_SEEN_SECONDS < (60*60)) {
      const MINUTES = Math.floor(LAST_SEEN_SECONDS/60);
      return 'last seen ' + MINUTES + (MINUTES == 1 ? ' minute ' : ' minutes ') + 'ago.'; 
    }

    // Four Hours
    if(LAST_SEEN_SECONDS < ( (60*60) * 4 )) {
      const HOUR = Math.floor(LAST_SEEN_SECONDS / (60*60) );
      const MINUTES = LAST_SEEN_SECONDS % (60*60);
      var lastSeen = 'last seen ' + HOUR + (HOUR > 1 ? ' hour ' : ' hours ');
      
      if(MINUTES != 0 || MINUTES != null) {
        var _minutes = Math.floor(MINUTES/(60));
        lastSeen += _minutes == 1 ? (_minutes + ' minute ') : (_minutes + ' minutes '); 
      }

      return lastSeen + ' ago';
    }

    // Today
    if(timestamp > this.getTodayTimestamp()) {
      return 'last seen Today at ' + (TIME.getHours() > 12 ? (TIME.getHours()-12) + ':' + TIME.getMinutes() + 'pm' : (TIME.getHours() + ':' + TIME.getMinutes() + 'am'));
    }

    // Yesterday
    if(timestamp > this.getYesterdayTimestamp()) {
      if(TIME.getHours() > 12) {
        var _hour = TIME.getHours() - 12;
        return 'last seen Yesterday at ' + _hour + ':' + TIME.getSeconds() + 'pm'
      }
      return 'last seen Yesterday at ' + TIME.getHours() + ':' + TIME.getSeconds() + 'am';
    }

    var time = (TIME.getHours() > 12 ? (TIME.getHours()-12) + ':' + TIME.getMinutes() + 'pm' : (TIME.getHours() + ':' + TIME.getMinutes() + 'am'))
    return 'last seen at ' + time + ' ' + this.dateOfWeek[TIME.getDay()] + ' ' + TIME.getDate() + ' ' + this.monthsOfYear[TIME.getMonth()];
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
  getYesterdayTimestamp() {
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
