import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        ImageCropperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
