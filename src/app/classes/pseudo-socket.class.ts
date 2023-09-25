import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_DELAY_MS,
} from '@constants/default.values';
import { PSEUDO_SOCKET_TYPES } from '@constants/pseudo-socket.types';
import { IDataEntry } from '@interfaces/data-entry.interface';
import { DataEntriesGenerator } from './data-entries-generator.class';
import { ISocketSettings } from '@interfaces/socket-settings.interface';

export class PseudoSocket {
  private delay = DEFAULT_DELAY_MS;
  private size = DEFAULT_ARRAY_SIZE;
  private timer = setTimeout(() => {}, 0);
  private dataEntriesGenerator = new DataEntriesGenerator();

  private handlers: {
    message: Set<(data: IDataEntry[]) => void>;
  } = {
    message: new Set(),
  };

  constructor() {}

  send(message: string): void {
    const parsed = JSON.parse(message);
    const { type } = parsed;

    if (type && type === PSEUDO_SOCKET_TYPES.SETTINGS) {
      const { data } = parsed;
      this.setSettings(data);
      this.generateTimeout();
    }
  }

  addEventListener(type: 'message', cb: (data: IDataEntry[]) => void): void {
    this.handlers[type].add(cb);
  }

  open(): void {
    this.generateTimeout();
  }

  close(): void {
    clearTimeout(this.timer);
    this.handlers = {
      message: new Set(),
    };
  }

  private generateTimeout(): void {
    clearTimeout(this.timer);
    this.postMessage();
    this.timer = setTimeout(() => {
      this.generateTimeout();
    }, this.delay);
  }

  private setSettings(settings: ISocketSettings): void {
    const { delay, size } = settings;

    this.delay = delay && delay > 0 ? delay : DEFAULT_DELAY_MS;
    this.size = size && size > 0 ? size : DEFAULT_ARRAY_SIZE;
  }

  private postMessage(): void {
    this.handlers.message.forEach((cb) => {
      cb.call(null, this.dataEntriesGenerator.generate(this.size));
    });
  }
}
