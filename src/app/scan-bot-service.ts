import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import ScanbotSdk, { DocumentScannerConfiguration, ScanbotSDKConfiguration } from 'cordova-plugin-scanbot-sdk';
import {DialogsService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ScanBotService {

  public readonly myLicenseKey = '';

  public SDK = ScanbotSdk.promisify();

  constructor(private platform: Platform,
              private dialogsService: DialogsService,
              private file: File) {
    this.platform.ready().then(() => this.initScanbotSdk());
  }

  private initScanbotSdk() {
    const customStorageBaseDirectory = this.getDemoStorageBaseDirectory();

    const config: ScanbotSDKConfiguration = {
      loggingEnabled: true,
      licenseKey: this.myLicenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
      storageBaseDirectory: customStorageBaseDirectory
    };
    return this.SDK.initializeSdk(config).then(result => {
      console.log(JSON.stringify(result));
    }).catch((err) => {
      console.error(JSON.stringify(err));
    });
  }

  private getDemoStorageBaseDirectory(): string {
    if (this.platform.is('android')) {
      return this.file.externalDataDirectory + 'my-custom-storage';
    } else if (this.platform.is('ios')) {
      return this.file.documentsDirectory + 'my-custom-storage';
    }
    return null;
  }

  public async checkLicense() {
    const result = await this.SDK.isLicenseValid();
    if (result.isLicenseValid === true) {
      return true;
    }
    this.dialogsService.showAlert('Scanbot SDK (trial) license has expired!');
    return false;
  }

  public globalDocScannerConfigs(): DocumentScannerConfiguration {
    return {
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
    };
  }
}
