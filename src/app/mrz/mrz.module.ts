import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MrzPageRoutingModule } from './mrz-routing.module';

import { MrzPage } from './mrz.page';
import {
    DateAdapter,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatNativeDateModule,
    MatProgressBarModule
} from '@angular/material';
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
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  declarations: [MrzPage],
})
export class MrzPageModule {}
