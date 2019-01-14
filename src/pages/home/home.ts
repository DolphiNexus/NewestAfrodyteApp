import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';


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

takePhoto(){
    const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
        this.myphoto = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
       // Handle error
      });
}

}
