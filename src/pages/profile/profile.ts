import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService) {
  }

  //-- executa qdo pagina eh carregada
  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      
      //-- faz busca por email e seta cliente (dados, img, etc)
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          //-- buscar imagem
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
  }

  //-- testa se imagem existe no bucket
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {})
  }

}
