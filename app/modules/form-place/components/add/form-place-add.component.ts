import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'kl-form-place-add',
  templateUrl: 'form-place-add.html',
})
export class FormPlaceAddComponent implements OnInit{

  public constructor( private router:Router) { }

  public ngOnInit() { }

  protected onSearchPlace(place) {
    this.router.navigate(['/add-place-validation', place.id, 'geoloc']);
  }
}