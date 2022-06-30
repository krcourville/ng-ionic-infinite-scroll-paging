import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SwapiClient } from './swapi-client';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [SwapiClient],
})
export class SwapiClientModule {}
