import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class NewsletterService {
  readonly server = 'https://nperperidis.site/CrossXFit.Api/api/'

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(sub: any) {
    console.log(sub.keys);
    console.log(sub);
    return this.http.post(this.server + 'notifications/addSubscriber', sub);
  }

  send() {
    return this.http.post(this.server + 'notifications/addSubscriber', null);
  }
}
