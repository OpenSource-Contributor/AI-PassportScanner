import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private alertController: AlertController,
              private loadingController: LoadingController) { }

  public async showAlert(msg: string, hdr: string = 'Info', subHdr: string = '') {
    const alert = await this.alertController.create({
      header: hdr,
      subHeader: subHdr,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async createLoading(msg: string) {
    return await this.loadingController.create({
      message: msg,
    });
  }
}
