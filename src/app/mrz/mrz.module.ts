import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MrzPageRoutingModule } from './mrz-routing.module';

import { MrzPage } from './mrz.page';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule} from '@angular/material';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MrzPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    FlexModule,
    MatIconModule
  ],
  declarations: [MrzPage]
})
export class MrzPageModule {}
