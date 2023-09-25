import { Injectable } from '@angular/core';
import { DataEntry } from '@classes/data-entry.class';
import { WORKER_EVENTS } from '@constants/worker.events';
import { WORKER_NAMES } from '@constants/worker.names';
import { plainToClass } from '@helpers/plain-to-class';
import { IDataEntry } from '@interfaces/data-entry.interface';
import { ISocketSettingsService } from '@interfaces/socket-settings-service.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private worker!: Worker;

  private dataEntriesSub$ = new BehaviorSubject<DataEntry[]>([]);
  private dataEntries$ = this.dataEntriesSub$.asObservable();

  constructor() {}

  public getEntries$(): Observable<DataEntry[]> {
    return this.dataEntries$;
  }

  public setSettings(settings: ISocketSettingsService): void {
    const { size, delay, additional } = settings;
    this.worker.postMessage({
      type: WORKER_EVENTS.SETTINGS,
      settings: { size, delay, additional: this.parseAdditional(additional) },
    });
  }

  public startWorker(): void {
    if (this.worker) {
      return;
    }

    this.worker = new Worker(
      new URL('../workers/web.worker', import.meta.url),
      {
        type: 'module',
        name: WORKER_NAMES.PSEUDO,
      }
    );

    this.worker.onmessage = (message: MessageEvent) => {
      this.dataEntriesSub$.next(
        message.data
          .map((entry: IDataEntry): DataEntry => {
            return plainToClass<DataEntry, IDataEntry>(DataEntry, entry);
          })
          .toSorted((a: DataEntry, b: DataEntry) => Number(a.id) - Number(b.id))
      );
    };

    this.worker.postMessage({
      type: WORKER_EVENTS.INIT,
    });
  }

  public terminateWorker(): void {
    this.worker.postMessage({
      type: WORKER_EVENTS.COMPLETE,
    });
    this.worker.terminate();
    this.dataEntriesSub$.complete();
  }

  private parseAdditional(additional: string = ''): Array<string> {
    if (additional.trim() === '') {
      return [];
    }
    const reg = /\s/g;
    const str = additional.replace(reg, ',');
    const set = new Set(
      str
        .split(',')
        .filter((item) => item.trim() !== '')
        .map((item) => Number(item))
        .filter((item) => !isNaN(item))
        .filter((item) => item >= 0)
        .map((item) => String(item))
    );

    return Array.from(set);
  }
}
