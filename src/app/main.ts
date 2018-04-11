import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// import 'hammerjs';
import 'rxjs/add/operator/map';

platformBrowserDynamic().bootstrapModule(AppModule);
