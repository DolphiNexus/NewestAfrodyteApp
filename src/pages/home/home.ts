import { FIREBASE_CONFIG } from './../../app/firebase.config';
import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';

import { ClosetPage } from './../closet/closet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

myphoto:any;

  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
      like: {
          backgroundColor: '#28e93b'
      },
      dislike: {
          backgroundColor: '#e92828'
      }
  };

  images=["https://i.pinimg.com/originals/34/7b/32/347b3214800619a2ef54eb944dd1966b.jpg",
 "https://i.pinimg.com/originals/07/ea/e5/07eae515f195bd3a491bf3145e7a6fa4.jpg",
  "https://theimpression.com/wp-content/uploads/2014/06/mens-fashion-street-style-milan-day-2-the-impression-june-2014-007-682x1024.jpg",
  ]

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer, private camera: Camera) {

    initializeApp(FIREBASE_CONFIG)

    for (let i = 0; i < this.images.length; i++) {
      this.attendants.push({
          id: i + 1,
          likeEvent: new EventEmitter(),
          destroyEvent: new EventEmitter(),
          asBg: sanitizer.bypassSecurityTrustStyle('url('+this.images[i]+')')
      });
  }

  this.ready = true;
}

onCardInteract(event) {
console.log(event);
  }

async takePhoto(){
    try {
    const options: CameraOptions = {
        quality: 70,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      }
      
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('pictures/myClothes');
      pictures.putString(image, 'data_url');
    }
    catch (e) {
        console.error(e);
    }
}

switchToCloset() {
    this.navCtrl.push(ClosetPage);
    }

}
