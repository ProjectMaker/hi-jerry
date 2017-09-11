import {Http, Headers, RequestOptions} from "@angular/http";

import { PlaceStorageService } from './place-storage.service';
import { PlaceStorageMockService } from './place-storage.mock.service';
import { Config } from '../../config';

export default () => {
  return { provide: PlaceStorageService, useFactory: (http:Http) => Config.mockStorage ? new PlaceStorageMockService() : new PlaceStorageService(http), deps: [Http] }
}