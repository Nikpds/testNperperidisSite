import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  readonly server = 'https://www.cross-arm.gr/api/';
  title = 'angular-pwa-app';
  readonly VAPID_PUBLIC_KEY =
    'BFjpqEBTdSG3dJU06X6b2U6VuBXx6RE2lcCWLZXJbMU2lph-6elhLOQhNGpirmo9PkeCVehJ6Cc7_idsJtTudeU';
  email?: string;

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private newsletterService: NewsletterService
  ) {}

  ngOnInit() {}

  checkEmail() {
    return this.http.post(this.server + 'athlete/validate/subscription', {
      key: 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAcrcPVP4wNgtzHCsVYb2xWsEd7jJVYd+p',
      email: this.email
    });
  }

  async subscribeToNotifications() {
    try {
      await this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then((sub) => {
          console.log(sub);
          this.newsletterService.addPushSubscriber(sub).subscribe();
        })
        .catch((err) =>
          console.log('Could not subscribe to notifications', err)
        );
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }
  }
}
