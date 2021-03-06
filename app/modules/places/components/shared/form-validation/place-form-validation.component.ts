import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlaceSearchService } from '../../../../google-sdk/shared/place/search/place-search.service';
import providePlaceStorageService from '../../../shared/storage/provide-service';
import { PlaceStorageService } from '../../../shared/storage/place-storage.service';
import { CONTEXT_VALUES } from '../../../../../shared/place/place';

@Component({
  moduleId: module.id,
  selector: 'kl-place-form-validation',
  templateUrl: 'place-form-validation.html',
  styleUrls: ["./place-form-validation.common.css", "./place-form-validation.component.css"],
  providers: [ providePlaceStorageService() ]
})
export class PlaceFormValidationComponent implements OnInit{
  public isReady:boolean = false;
  public iconStar:string = String.fromCharCode(0xf005);
  public step:string = 'search';
  public contextValues:Array<any> = CONTEXT_VALUES;
  public placeForm:FormGroup;
  public noteCtrl:AbstractControl;
  public contextsCtrl:AbstractControl;

  @Input() place:any;
  @Output() submit = new EventEmitter();
  public constructor(private placeSearch:PlaceSearchService, private placeStorage:PlaceStorageService, private route:ActivatedRoute, private fb:FormBuilder) { }


  public ngOnInit() {
    this.initForm();
  }

  public onChangeStar(note:number) {
    if (this.place.note !== note) this.place.note = note;
    else this.place.note = 0;
    this.noteCtrl.setValue(this.place.note);
  }

  public onChangeContext(event:any, context:any) {
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
      this.submit.next('');
    }
  }

  private initForm() {
    this.placeForm = this.fb.group({
      comment: this.fb.control('', [Validators.required]),
      note: this.fb.control('', [Validators.required, Validators.pattern(/[1-5]{1}/)]),
      contexts: this.fb.control('', [Validators.required])
    });
    this.noteCtrl = this.placeForm.controls['note'];
    this.contextsCtrl = this.placeForm.controls['contexts'];
  }
}