import { randomColor } from '@helpers/random-color';
import { randomFloat } from '@helpers/random-float';
import { randomInt } from '@helpers/random-int';
import { IDataEntry } from '@interfaces/data-entry.interface';

export class DataEntry implements IDataEntry {
  id: string;
  int: number;
  float: string;
  color: string;
  child: {
    id: string;
    color: string;
  };

  constructor(data?: IDataEntry) {
    this.id = data?.id ?? String(randomInt());
    this.int = data?.int ?? randomInt();
    this.float = data?.float ?? randomFloat();
    this.color = data?.color ?? randomColor();
    this.child = data?.child ?? {
      id: String(randomInt()),
      color: randomColor(),
    };
  }

  public cal(): void {}
}
