import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app.module";

import * as tnsOAuthModule from 'nativescript-oauth';

/**
 * Initialization facebook options
 * @type {{clientId: string, clientSecret: string, scope: string[]}}
 */

 const fbOptions : tnsOAuthModule.ITnsOAuthOptionsFacebook = {
 clientId: '160931807807827',
 clientSecret: '99b25a3a90f4ba8baf390c33335a4ac6',
 scope: ['email'] //whatever other scopes you need
 };

tnsOAuthModule.initFacebook(fbOptions);

platformNativeScriptDynamic().bootstrapModule(AppModule);
