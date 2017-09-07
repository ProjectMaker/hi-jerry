import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Position } from 'nativescript-google-maps-sdk';
import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlaceMap, CONTEXT_VALUES } from '../../shared/place/place';
import { PlaceStorageService } from '../../shared/place/place-storage.service';
import { PlaceSearchService } from '../../shared/place/place-search.service';

@Component({
  moduleId: module.id,
  selector: 'kl-place',
  templateUrl: 'place.html',
  styleUrls: ["./place.common.css", "./place.component.css"],
})
export class PlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public contextValues:Array<any> = CONTEXT_VALUES;
  public placeForm:FormGroup;
  public noteCtrl:AbstractControl;
  public contextsCtrl:AbstractControl;
  public place:PlaceMap;
  public isReady:boolean = false;
  
  public constructor(private placeStorage:PlaceStorageService, private placeSearch:PlaceSearchService, private fb:FormBuilder, private route:ActivatedRoute) { }


  public ngOnInit() {
    this.placeForm = this.fb.group({
      comment: this.fb.control('', [Validators.required]),
      note: this.fb.control('', [Validators.required, Validators.pattern(/[1-5]{1}/)]),
      contexts: this.fb.control('', [Validators.required])
    });
    this.noteCtrl = this.placeForm.controls['note'];
    this.contextsCtrl = this.placeForm.controls['contexts'];

    this.placeSearch.searchByPositionAndName(Position.positionFromLatLng(48.8511475,2.399606700000001), 'bouion')
      .subscribe(
        (result) => console.log('result', result),
        (err) => console.log('err', err),
        () => console.log('complete')
      );

    this.placeStorage.isReady()
      .subscribe(
        () => {
          const params = this.route.snapshot.queryParamMap;
          if (params.get('id')) {
            this.placeStorage.emitter.subscribe(
              (places) => {
                this.isReady = true;
                this.place = places.find(place => place.id === parseInt(params.get('id')));
                this.noteCtrl.setValue(this.place.note);
                this.contextsCtrl.setValue(this.place.contexts.join(','));
              },
              (err) => console.log(err)
            );
            this.placeStorage.fetch();
          } else {
            this.place = {
              name: params.get('name'), address: params.get('address'),
              location: Position.positionFromLatLng(parseInt(params.get('latitude')),parseInt(params.get('longitude'))),
              type: params.get('type'), origin: params.get('origin'), externalId: params.get('externalId'),
              note: 0, contexts: [], comment: '',
            };

            this.isReady = true;
          }
        }
      );
  }

  public onChangeStar(note:number) {
    if (this.place.note !== note) this.place.note = note;
    else this.place.note = 0;
    this.noteCtrl.setValue(this.place.note);
  }

  public onChangeContext(event:any, context:any) {
    if (!this.place) return false;
    if (event.object.checked) {
      if (this.place.contexts.indexOf(context.value) === -1) this.place.contexts.push(context.value);
    } else {
      this.place.contexts = this.place.contexts.filter(value => value !== context.value);
    }

    this.contextsCtrl.setValue(this.place.contexts.join(','));
  }

  public onSubmit() {
    if (this.placeForm.valid) {
      const loader = new LoadingIndicator();
      loader.show({
        message: 'process ...',
        ios: {
          color: '#FFFFFF',
          backgroundColor: '#000000',
        }
      });
      this.place.comment = this.placeForm.controls['comment'].value;
      if (!this.place.id) this.placeStorage.insert(this.place).subscribe(id => { this.place.id = id; loader.hide() });
      else {
        this.placeStorage.update(this.place).subscribe(() => loader.hide());
      }
    }
  }
}