import { Pipe, PipeTransform } from "@angular/core";
import { CONTEXT_VALUES } from '../../shared/place/place';

@Pipe({
  name: 'placeContextChecked'
})
export class PlaceContextCheckedPipe implements PipeTransform {
  public transform(context:any, place:any) {
    //console.log(JSON.stringify(place));

    return place && place.contexts.indexOf(context.value) !== -1;
  }
}