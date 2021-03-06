import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlaceStorageService} from '../../shared/storage/place-storage.service';
import providePlaceStorageService from '../../shared/storage/provide-service';

@Component({
  moduleId: module.id,
  selector: 'kl-place-detail',
  templateUrl: 'place-detail.html',
  providers: [ providePlaceStorageService() ]
})
export class PlaceDetailComponent implements OnInit {
  protected place:any;
  protected isReady:boolean = false;

  public constructor(private placeStorage:PlaceStorageService, private route:ActivatedRoute) { }

  public ngOnInit() {
    this.placeStorage.loadById(this.route.snapshot.params.id)
      .subscribe(
        (place) => {
          this.place = place;
          this.isReady = true;
        },
        (err) => console.log(err)
      )
    
  }

  public onSubmit() {
    const loader = new LoadingIndicator();
    loader.show({
      message: 'process ...',
      ios: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      }
    });

    this.placeStorage.update(this.place).subscribe(
      () => loader.hide(),
      (err) => loader.hide(),
      () => console.log('complete')
    );
  }
}