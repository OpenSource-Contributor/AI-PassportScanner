import { Component, OnInit } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import {PassportService} from '../passport.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private crop: Crop, private passportService: PassportService, private camera: Camera) {}
  image;
  passportInfo;
  isProcessing = false;
  imageChangedEvent;
  cameraOptions: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  form: FormGroup;
  croppedImage: any = '';
  ngOnInit(): void {
    this.form = new FormGroup({
      passportNo: new FormControl(''),
      country: new FormControl(''),
      nationality: new FormControl(''),
      gender: new FormControl(''),
      givenName: new FormControl(''),
      surname: new FormControl(''),
      dob: new FormControl(''),
      expiryDate: new FormControl('')
    });
  }
  capture() {
    this.isProcessing = false;
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
  processImage() {
    this.isProcessing = true;
    this.passportInfo = null;
    this.passportService.getPassportInfo(this.croppedImage.substring(23, this.croppedImage.length)).subscribe(res => {
      if (res) {
        this.passportInfo = res;
        this.isProcessing = false;
        this.form.get('passportNo').setValue(this.passportInfo.passportNo);
        this.form.get('country').setValue(this.passportInfo.country);
        this.form.get('nationality').setValue(this.passportInfo.nationality);
        this.form.get('gender').setValue(this.passportInfo.gender);
        this.form.get('givenName').setValue(this.passportInfo.givenName);
        this.form.get('surname').setValue(this.passportInfo.surname);
        this.form.get('dob').setValue(this.passportInfo.dob);
        this.form.get('expiryDate').setValue(this.passportInfo.expiryDate);
      }
    });
  }
  onClear() {
    this.passportInfo = null;
    this.isProcessing = false;
  }
  imageCropped(image) {
    this.croppedImage = image.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
