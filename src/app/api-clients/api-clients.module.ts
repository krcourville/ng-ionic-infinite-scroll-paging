import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FakeApiClient } from "./fake-api-client";
import { SwapiClient } from "./swapi-client";

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [SwapiClient, FakeApiClient],
})
export class SwapiClientModule {}
