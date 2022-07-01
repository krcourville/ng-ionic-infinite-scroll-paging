import range from "lodash/range";
import flatten from "lodash/flatten";

import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll } from "@ionic/angular";
import { concat, of, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import {
  FakeApiClient,
  Event as EventData,
} from "../api-clients/fake-api-client";

import { compareAsc } from "date-fns";

/**
 * Buffer up this many pages of data to start
 * ion-infinite-scroll will only trigger when it scrolls into the viewport
 * better solutions?
 */
const INITIAL_PAGES_TO_LOAD = 3;

type HeaderItem = { type: "header"; caption: Date };
type EventItem = EventData & { type: "event" };
type ListItem = EventItem | HeaderItem;

@Component({
  selector: "app-detail",
  templateUrl: "detail.page.html",
  styleUrls: ["detail.page.scss"],
})
export class DetailPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild(CdkVirtualScrollViewport) scrollViewPort: CdkVirtualScrollViewport;

  itemSize = 200;

  pageEndBuffer = this.itemSize * 10;

  items: ListItem[] = [];

  nextPage = 1;

  fetching = false;

  endOfData = false;

  subscribes: Subscription[] = [];

  lastDateHeader: Date | null = null;

  constructor(private api: FakeApiClient) {}

  ngOnInit(): void {
    const initialFetches = range(INITIAL_PAGES_TO_LOAD).map((idx: number) =>
      this.fetchPage(idx + 1)
    );
    concat(...initialFetches).subscribe();
  }

  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  }

  trackItem(_idx: number, item: ListItem) {
    return item.type === "header"
      ? `header-${item.caption}`
      : `person-${item.id}`;
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

    return this.api.getEvents().pipe(
      tap((res) => {
        console.log("APPENDING DATA...");
        if (res.results.length > 0) {
          const next: ListItem[][] = res.results.map((item) => {
            const result: ListItem[] = [
              <EventItem>{
                ...item,
                type: "event",
              },
            ];

            const addHeader =
              this.lastDateHeader == null ||
              0 !== compareAsc(this.lastDateHeader, item.date);

            if (addHeader) {
              result.unshift(<HeaderItem>{
                type: "header",
                caption: item.date,
              });
              this.lastDateHeader = item.date;
            }

            return result;
          });
          this.items = [...this.items, ...flatten(next)];
        }
        console.log("FETCH complete");
        this.fetching = false;
        // this.endOfData = res.next == null;
        // this.nextPage++;
      })
    );
  }
}
