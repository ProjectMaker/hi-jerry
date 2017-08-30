import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'placeContextChecked'
})
export class PlaceContextCheckedPipe implements PipeTransform {
  public transform(contexts:Array<any>, context:any) {
    return contexts.indexOf(context.value) !== -1;
  }
}