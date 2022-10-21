import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ConfigService } from './config.service';

let ConfigFactory = (config: ConfigService) => {
  return () => config.load();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigFactory,
      deps: [ConfigService],
      multi: true
    }
  ]
})

export class ConfigModule { }
