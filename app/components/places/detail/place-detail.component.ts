import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceStorageService} from '../../../shared/place/storage/place-storage.service';
import providePlaceStorageService from '../../../shared/place/storage/provide-service';

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
}