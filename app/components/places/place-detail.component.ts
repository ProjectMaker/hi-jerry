import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from '@angular/router';

import { PlaceStorageService } from '../../shared/place/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailComponent implements OnInit{
  public isReady:boolean = false;
  public place:any = {};
  public constructor(private placeStorage:PlaceStorageService, private route:ActivatedRoute) {}

  public ngOnInit() {
    this.placeStorage.isReady()
      .subscribe(
        () => {
          this.route.queryParams.subscribe((params:any) => {
            const id = parseInt(params.id);
            this.placeStorage.emitter.subscribe(
              (places) => {
                this.place = places.find(place => place.id === id);
              },
              (err) => console.log(err)
            );
            this.placeStorage.fetch();
          });
          this.isReady = true;
        },
        (err) => console.log(err),
        () => console.log('completed')
      );
  }
}