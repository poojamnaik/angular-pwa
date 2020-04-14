import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { CoreService } from './core.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  title = 'my-app';
  readonly VAPID_PUBLIC_KEY = 'BPvPWzqyLArXdBH0wNAIe9-J68fEnbfTKnQD9ZXvPGVSXKLLw4gr9mFTjKJ94RD4ibimHmGL_kYv3eiXQTmbV6s';
  constructor(
    private swPush: SwPush,
    private coreService: CoreService
  ) { }

  notificationEnabled = false;
  ngOnInit() {
    this.coreService.healthCheck().subscribe( msg => {
      console.log('message', msg);
    });
    this.notificationEnabled = this.swPush.isEnabled;
  }

  subscribe() {
    console.log('Subscribe');
    this.swPush.requestSubscription({
      //  identfy which server is requsting permission to  push notifications
      // use web-pus to generate vapid(voluntary application server Identification)   keys
        serverPublicKey : this.VAPID_PUBLIC_KEY
    }).then(sub => {
      console.log('Notification subscribed successfully ', sub);
      this.coreService.addPushSubscriber(sub).subscribe(mes => {
        console.log('sucessfully  subscribing', mes); } , err => { console.log('Error while subscribing'); }
      );
    })
    .catch (err => console.error('COuld not subscribed', err));
  }


  send() {
    console.log('Send');
    this.coreService.sendPushNotifications().subscribe(message => {
      console.log('Send receved', message);
    });
  }
}
