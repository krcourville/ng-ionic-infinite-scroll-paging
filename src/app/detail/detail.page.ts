import range from "lodash/range";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
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

  people: Person[] = [];

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

  trackPerson(_idx: number, person: Person) {
    return person.name;
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
          this.people = [...this.people, ...res.results];
        }
        console.log("FETCH complete");
        this.fetching = false;
        this.endOfData = res.next == null;
        console.log("end", this.endOfData);
        this.nextPage++;
      })
    );
  }
}
