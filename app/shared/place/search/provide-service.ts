import {Http} from "@angular/http";

import { PlaceSearchService } from './place-search.service';
import { PlaceSearchMockService } from './place-search.mock.service';
import { Config } from '../../config';

export default () => {
  return { provide: PlaceSearchService, useFactory: (http:Http) => Config.mockSearch ? new PlaceSearchMockService(http) : new PlaceSearchService(http), deps: [] }
}