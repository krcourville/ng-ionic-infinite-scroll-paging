import range from "lodash/range";
import random from "lodash/random";
import { Injectable } from "@angular/core";
import { faker } from "@faker-js/faker";
import { Observable, of, delay } from "rxjs";
import { addMinutes, addDays, addHours, startOfDay } from "date-fns";

export interface Event {
  id: number;
  subject: string;
  date: Date;
  start: Date;
  end: Date;
  duration: number;
}

export interface GetEventsRequest {
  pageSize?: number;
}

export interface GetEventsResponse {
  results: Event[];
}

const DURATIONS = [15, 30, 60, 90, 120];

let nextId = 0;

let nextDate = addDays(startOfDay(new Date()), -(7 * 3));

@Injectable()
export class FakeApiClient {
  getEvents(request: GetEventsRequest = null): Observable<GetEventsResponse> {
    request = request ?? {};
    request.pageSize = request.pageSize ?? 10;

    const results = range(request.pageSize).map((idx) => {
      const date = addDays(nextDate, random(2));
      nextDate = date;

      const startHour = 8 + random(0, 8);
      const duration = DURATIONS[random(DURATIONS.length - 1)];
      const start = addHours(date, startHour);
      const end = addMinutes(start, duration);
      return <Event>{
        id: ++nextId,
        subject: faker.random.words(5),
        date,
        start,
        end,
        duration,
      };
    });

    return of({ results }).pipe(delay(400));
  }
}
