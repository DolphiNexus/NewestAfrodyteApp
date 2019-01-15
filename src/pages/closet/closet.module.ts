import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClosetPage } from './closet';

@NgModule({
  declarations: [
    ClosetPage,
  ],
  imports: [
    IonicPageModule.forChild(ClosetPage),
  ],
})
export class ClosetPageModule {}
