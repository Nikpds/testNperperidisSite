import { Component } from '@angular/core';
import { SwPush, SwUpdate, } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-pwa-app';
  readonly VAPID_PUBLIC_KEY = "BFjpqEBTdSG3dJU06X6b2U6VuBXx6RE2lcCWLZXJbMU2lph-6elhLOQhNGpirmo9PkeCVehJ6Cc7_idsJtTudeU";

  constructor(
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) { }

  ngOnInit() {
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      console.log(sub)
      this.newsletterService.addPushSubscriber(sub).subscribe()
    })
      .catch(err => 
        console.log("Could not subscribe to notifications", err));
  }
}
