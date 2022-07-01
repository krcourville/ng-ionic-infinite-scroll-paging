import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SwapiClientModule } from "../api-clients/api-clients.module";
import { DetailPageRoutingModule } from "./detail-routing.module";
import { DetailPage } from "./detail.page";

@NgModule({
  imports: [
    IonicModule,
    DetailPageRoutingModule,
    ScrollingModule,
    SwapiClientModule,
    CommonModule,
  ],
  declarations: [DetailPage],
})
export class DetailPageModule {}
