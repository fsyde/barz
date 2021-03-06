import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
 providedIn: 'root'
})
export class LocationService {

 constructor() {}
  getLocation(): Observable<any> {
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 1000
    }
    function location(observer) {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Has Position", position)
            observer.next(position);
            observer.complete();
          },
          (error) =>{
            let i = 0;
            console.log("Trying to get location Again")
            location(observer)
            i++;
            if(i>25){
              alert("Reloading Page to get location")
              window.location.reload();
            }

          }, options
        );
      } else {
        observer.error('Unsupported Browser');
      }
    }
    return Observable.create(observer => {
      location(observer);
    });
  }
}
