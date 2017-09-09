import { Component, Input } from '@angular/core';

import { LoadingIndicator } from "nativescript-loading-indicator";

import providePlaceStorageService from '../../../../shared/place/storage/provide-service';
import { PlaceStorageService } from '../../../../shared/place/storage/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-edit',
  templateUrl: 'form-place-edit.html',
  providers: [ providePlaceStorageService() ]
})
export class FormPlaceEditComponent {
  @Input() place:any;
  public constructor(private placeStorage: PlaceStorageService) { }

  public onSubmit() {
    const loader = new LoadingIndicator();
    loader.show({
      message: 'process ...',
      ios: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      }
    });
    
    this.placeStorage.update(this.place).subscribe(() => loader.hide());
  }
}