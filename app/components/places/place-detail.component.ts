import { Component, OnInit } from "@angular/core";

import { PlaceStorageService } from '../../shared/place/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailComponent implements OnInit{
  public isReady:boolean = false;

  public constructor(private placeStorage:PlaceStorageService) {}

  public ngOnInit() {
    this.placeStorage.isReady()
      .subscribe(
        () => {
          this.isReady = true;
        },
        (err) => console.log(err),
        () => console.log('completed')
      );
  }
}