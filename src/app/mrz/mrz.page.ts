import { Component, OnInit } from '@angular/core';
import {ScanBotService} from '../scan-bot-service';
import {MrzScannerConfiguration} from 'cordova-plugin-scanbot-sdk';
import {Platform} from '@ionic/angular';
import {DialogsService} from '../dialog.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mrz',
  templateUrl: './mrz.page.html',
  styleUrls: ['./mrz.page.scss'],
})
export class MrzPage implements OnInit {

  constructor(public scanbotService: ScanBotService,
              private platform: Platform,
              private dialogService: DialogsService) { }

  form: FormGroup;
  isResult = false;
  ngOnInit() {
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

  async startMrzScanner() {
    this.isResult = false;
    if (!(await this.scanbotService.checkLicense())) { return; }
    const config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.platform.is('ios')) {
      const widthPx = window.screen.width;
      config.finderWidth = widthPx * 0.9;
      config.finderHeight = widthPx * 0.18;
    }
    const result = await this.scanbotService.SDK.UI.startMrzScanner({uiConfigs: config});
    if (result.status === 'OK') {
      this.isResult = true;
      // await this.dialogService.showAlert(fields.join(''), 'MRZ Result');
      // const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      result.mrzResult.fields.map(f => {
        this.setResultToForm(f);
      });
    }
  }
  setResultToForm(mrzResult) {
    if (mrzResult.name === 'DocumentCode') {
      this.form.get('passportNo').setValue(mrzResult.value);
    }
    if (mrzResult.name === 'IssuingStateOrOrganization') {
      this.form.get('country').setValue(mrzResult.value);
    }
    if (mrzResult.name === 'Nationality') {
      this.form.get('nationality').setValue(mrzResult.value);
    }
    if (mrzResult.name === 'Gender') {
      if (mrzResult.value === 'M') {
        this.form.get('gender').setValue('MALE');
      } else {
        this.form.get('gender').setValue('FEMALE');
      }
    }
    if (mrzResult.name === 'FirstName') {
      this.form.get('givenName').setValue(mrzResult.value);
    }
    if (mrzResult.name === 'LastName') {
      this.form.get('surname').setValue(mrzResult.value);
    }
    if (mrzResult.name === 'DateOfBirth') {
      if (mrzResult.value.length === 8) {
        this.form.get('dob').setValue(new Date(mrzResult.value.substring(6, 8), mrzResult.value.substring(3, 5)),
            mrzResult.value.substring(0, 2));
      }
    }
    if (mrzResult.name === 'DateOfExpiry') {
      if (mrzResult.value.length === 8) {
        this.form.get('expiryDate').setValue(new Date(mrzResult.value.substring(6, 8), mrzResult.value.substring(3, 5)),
            mrzResult.value.substring(0, 2));
      }
    }
  }
}
