import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Position } from 'nativescript-google-maps-sdk';
import {Observable} from "rxjs/Observable";

import { PlaceMap, CONTEXT_VALUES } from '../../shared/place/place';
import { PlaceStorageService } from '../../shared/place/place-storage.service';

@Component({
  moduleId: module.id,
  selector: 'kl-place',
  templateUrl: 'place.html',
  styleUrls: ["./place.common.css"],
})
export class PlaceComponent implements OnInit{
  public iconStar:string = String.fromCharCode(0xf005);
  public note:number = 0;
  public contextValues:Array<any> = CONTEXT_VALUES;
  public placeForm:FormGroup;
  public noteCtrl:AbstractControl;
  public contextsCtrl:AbstractControl;
  public place:PlaceMap;

  public constructor(private placeStorage:PlaceStorageService, private fb:FormBuilder) {

  }

  public ngOnInit() {
    this.placeForm = this.fb.group({
      comment: this.fb.control('', [Validators.required]),
      note: this.fb.control('', [Validators.required]),
      contexts: this.fb.control('', [Validators.required])
    });
    this.noteCtrl = this.placeForm.controls['note'];
    this.contextsCtrl = this.placeForm.controls['contexts'];

    Observable.of({
      name: 'La ferme', address: 'Levallois Perret',
      location: Position.positionFromLatLng(0,0),
      type: '', origin: '', externalId: '',
      note: 0, contexts: [], comment: '',
    }).subscribe(v => this.place = v);
  }

  public onTapStar(note:number) {
    if (this.place.note !== note) this.place.note = note;
    else this.place.note = 0;
    this.noteCtrl.setValue(this.place.note);
  }

  public onTapContext(event:any, context:any) {
    const checkboxElt = event.object;
    if (checkboxElt.checked) {
      if (this.place.contexts.indexOf(context.value) === -1) this.place.contexts.push(context.value);
    } else {
      this.place.contexts = this.place.contexts.filter(value => value !== context.value);
    }

    this.contextsCtrl.setValue(this.place.contexts.join(','));
  }

  public onSubmit() {
    if (this.placeForm.valid) {
      if (!this.place.id) this.placeStorage.insert(this.place).subscribe(id => this.place.id = id);
      else {
        this.placeStorage.update(this.place);
      }
    }
  }
}