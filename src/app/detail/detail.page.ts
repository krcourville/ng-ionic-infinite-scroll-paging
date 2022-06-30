import range from "lodash/range";
import random from "lodash/random";
import flatten from "lodash/flatten";

import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy,
} from "@angular/cdk/scrolling";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { concat, of, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Person, SwapiClient } from "../api-clients/swapi-client";

/**
 * Buffer up this many pages of data to start
 * ion-infinite-scroll will only trigger when it scrolls into the viewport
 * better solutions?
 */
const INITIAL_PAGES_TO_LOAD = 3;

type HeaderItem = { type: "header"; caption: string };
type PersonItem = { type: "person"; name: string };
type Item = PersonItem | HeaderItem;

@Component({
  selector: "app-detail",
  templateUrl: "detail.page.html",
  styleUrls: ["detail.page.scss"],
})
export class DetailPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild(CdkVirtualScrollViewport) scrollViewPort: CdkVirtualScrollViewport;

  itemSize = 56;

  pageEndBuffer = this.itemSize * 10;

  items: Item[] = [];

  nextPage = 1;

  fetching = false;

  endOfData = false;

  subscribes: Subscription[] = [];

  constructor(private swapiClient: SwapiClient) {}

  ngOnInit(): void {
    const initialFetches = range(INITIAL_PAGES_TO_LOAD).map((idx: number) =>
      this.fetchPage(idx + 1)
    );
    concat(...initialFetches).subscribe();
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  }

  trackItem(_idx: number, item: Item) {
    return item.type === "header"
      ? `header-${item.caption}`
      : `person-${item.name}`;
  }

  loadNextPage(event) {
    this.fetchPage(this.nextPage)
      .pipe(
        tap(() => {
          event.target.complete();
          event.target.disabled = this.endOfData;
        })
      )
      .subscribe();
  }

  private fetchPage(page: number) {
    if (this.endOfData) {
      return of();
    }

    this.fetching = true;
    console.log("FETCHING", page);
    return this.swapiClient.getPeople(page).pipe(
      tap((res) => {
        console.log("APPENDING DATA...");
        if (res.results.length > 0) {
          const next: Item[][] = res.results.map((m) => {
            return [
              random(7) === 7
                ? <HeaderItem>{ type: "header", caption: "Header Test" }
                : null,
              <PersonItem>{
                type: "person",
                name: m.name,
              },
            ];
          });
          const cleaned = flatten(next).filter((f) => f != null);
          this.items = [...this.items, ...cleaned];
        }
        console.log("FETCH complete");
        this.fetching = false;
        this.endOfData = res.next == null;
        this.nextPage++;
      })
    );
  }
}
