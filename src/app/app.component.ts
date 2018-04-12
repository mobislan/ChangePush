import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  registrationId: any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl:AlertController, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.pushsetup();
      splashScreen.hide();
    });
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '31428372280',
         topics:['nfl_changes'],
         vibrate:true,
         sound:true,
         forceShow:true
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'true'
     },
     windows: {}
  };
  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message

      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     this.registrationId = registration.registrationId;
  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
