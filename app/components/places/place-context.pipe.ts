import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'placeContextChecked'
})
export class PlaceContextCheckedPipe implements PipeTransform {
  public transform(place:any, context:any) {
    return place && place.contexts.indexOf(context.value) !== -1;
  }
}