import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OCR } from '@ionic-native/ocr/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatProgressBarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FlexLayoutModule, BrowserAnimationsModule, IonicModule.forRoot(), AppRoutingModule, ImageCropperModule, HttpClientModule, MatFormFieldModule, ReactiveFormsModule, MatProgressBarModule],
  providers: [
    StatusBar,
    SplashScreen,
      Camera,
      Crop,
      CameraPreview,
    OCR,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
