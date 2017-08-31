import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Position } from 'nativescript-google-maps-sdk';
import {Observable} from "rxjs/Observable";
import { StackLayout } from "ui/layouts/stack-layout";

import { PlaceMap, CONTEXT_VALUES } from '../../shared/place/place';
import { PlaceStorageService } from '../../shared/place/place-storage.service';

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

  public constructor(private placeStorage:PlaceStorageService, private fb:FormBuilder, private route:ActivatedRoute) {

  }


  public ngOnInit() {

    this.placeForm = this.fb.group({
      comment: this.fb.control('', [Validators.required]),
      note: this.fb.control('', [Validators.required, Validators.pattern(/[1-5]{1}/)]),
      contexts: this.fb.control('', [Validators.required])
    });
    this.noteCtrl = this.placeForm.controls['note'];
    this.contextsCtrl = this.placeForm.controls['contexts'];

    this.place = {
      name: 'YO', address: 'Paris',
      location: Position.positionFromLatLng(0,0),
      type: '', origin: '', externalId: '',
      note: 0, contexts: [], comment: '',
    };
    /*
    const params = this.route.snapshot.queryParamMap;
    if (params.get('id')) {
      this.placeStorage.isReady()
        .subscribe(
          () => {
            this.placeStorage.emitter.subscribe(
              (places) => {
                this.place = places.find(place => place.id === parseInt(params.get('id')));
                this.noteCtrl.setValue(this.place.note);
                this.contextsCtrl.setValue(this.place.contexts.join(','));
                console.log(JSON.stringify(this.place));
              },
              (err) => console.log(err)
            );
            this.placeStorage.fetch();
          }
        );
    } else {
      this.place = {
        name: params.get('name'), address: params.get('address'),
        location: Position.positionFromLatLng(parseInt(params.get('latitude')),parseInt(params.get('longitude'))),
        type: params.get('type'), origin: params.get('origin'), externalId: params.get('externalId'),
        note: 0, contexts: [], comment: '',
      };
    }
    */
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
      this.place.comment = this.placeForm.controls['comment'].value;
      console.log('onSubmit', JSON.stringify(this.place));
      if (!this.place.id) this.placeStorage.insert(this.place).subscribe(id => this.place.id = id);
      else {
        this.placeStorage.update(this.place);
      }
    }
  }
}