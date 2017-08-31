import { Pipe, PipeTransform } from "@angular/core";

import { getMarkerIcon } from '../../shared/place/place';

@Pipe({
  name: 'placeContextChecked'
})
class PlaceContextCheckedPipe implements PipeTransform {
  public transform(contexts:Array<any>, context:any) {
    return contexts && contexts.indexOf(context.value) !== -1;
  }
}

@Pipe({
  name: 'placeIconImgSrc'
})
class PlaceIconImgSrcPipe implements PipeTransform {
  public transform(type:string) {
    return `res://${getMarkerIcon(type)}`;
  }
}


export const placePipes = [
  PlaceContextCheckedPipe,
  PlaceIconImgSrcPipe
];