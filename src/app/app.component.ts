import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDN8rXxoRW6Jdtf14nZpA2tew4SfjszSOc",
  authDomain: "push-notification-6670c.firebaseapp.com",
  projectId: "push-notification-6670c",
  storageBucket: "push-notification-6670c.appspot.com",
  messagingSenderId: "729304950082",
  appId: "1:729304950082:web:c09f6dc65c92e9eae614db",
  measurementId: "G-L2QZ0Z06GZ"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  readonly server = 'https://www.cross-arm.gr/api/';
  title = 'angular-pwa-app';
  email?: string;


  constructor(
    private http: HttpClient,
  ) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const messaging = getMessaging();
    // Add the public key generated from the console here.
    getToken(messaging, { vapidKey: "BJZJnCBFZEotOw_8mxfkkSJ06Wj8RiyhF_ZuW5g4h94DGOGGrG7jbqbpaEcwyjuw05cj91ImQn-vSjBkON4iPlc" }).then(res => {
      console.log(res)
    }).catch(err => console.log(err));

  }

  ngOnInit() {

  }

  checkEmail() {
    return this.http.post(this.server + 'athlete/validate/subscription', {
      key: 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAcrcPVP4wNgtzHCsVYb2xWsEd7jJVYd+p',
      email: this.email
    }).subscribe(res => console.log(res));
  }

  async subscribeToNotifications() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }
}