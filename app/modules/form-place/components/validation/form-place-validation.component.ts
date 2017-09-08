import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoadingIndicator } from "nativescript-loading-indicator";

import { PlaceSearchService } from '../../../../shared/place/place-search.service';
import providePlaceStorageService from '../../../../shared/place/storage/provide-service';
import { PlaceStorageService } from '../../../../shared/place/storage/place-storage.service';
import { CONTEXT_VALUES } from '../../../../shared/place/place';

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-validation',
  templateUrl: 'form-place-validation.html',
  styleUrls: ["./form-place-validation.common.css", "./form-place-validation.component.css"],
  providers: [ providePlaceStorageService() ]
})
export class FormPlaceValidationComponent implements OnInit{
  public isReady:boolean = false;
  public iconStar:string = String.fromCharCode(0xf005);
  public step:string = 'search';
  public contextValues:Array<any> = CONTEXT_VALUES;
  public placeForm:FormGroup;
  public noteCtrl:AbstractControl;
  public contextsCtrl:AbstractControl;

  @Input() place:any;
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
      const loader = new LoadingIndicator();
      loader.show({
        message: 'process ...',
        ios: {
          color: '#FFFFFF',
          backgroundColor: '#000000',
        }
      });
      this.place.comment = this.placeForm.controls['comment'].value;
      this.placeStorage.insert(this.place)
        .subscribe((place => console.log(JSON.stringify(place))));
      loader.hide();
      /*
      if (!this.place.id) this.placeStorage.insert(this.place).subscribe(id => { this.place.id = id; loader.hide() });
      else {
        this.placeStorage.update(this.place).subscribe(() => loader.hide());
      }
      */
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