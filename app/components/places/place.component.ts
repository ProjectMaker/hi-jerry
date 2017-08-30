import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from "rxjs/Observable";

import { CONTEXT_VALUES } from '../../shared/place/place';

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
  public place:any;

  public constructor(private fb:FormBuilder) {

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
      note: 0, contexts: []
    }).subscribe(v => this.place = v);
  }

  public onTapStar(note:number) {
    if (this.place.note !== note) this.place.note = note;
    else this.place.note = '';
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
    console.log(this.placeForm.invalid);
    console.log(this.placeForm.valid);
  }
}