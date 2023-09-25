import { ISocketSettings } from '@interfaces/socket-settings.interface';

export interface ISocketSettingsService extends ISocketSettings {
  additional?: string;
}
