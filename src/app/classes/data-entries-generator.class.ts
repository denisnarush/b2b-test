import { DEFAULT_ARRAY_SIZE } from '@constants/default.values';
import { randomColor } from '@helpers/random-color';
import { randomFloat } from '@helpers/random-float';
import { randomInt } from '@helpers/random-int';
import { IDataEntry } from '@interfaces/data-entry.interface';

export class DataEntriesGenerator {
  generate(size = DEFAULT_ARRAY_SIZE): IDataEntry[] {
    const data = Array<IDataEntry>(size);

    for (let i = 0; i < size; i += 1) {
      data[i] = {
        id: String(i),
        int: randomInt(),
        float: randomFloat(),
        color: randomColor(),
        child: {
          id: String(randomInt(i)),
          color: randomColor(),
        },
      };
    }
    return data;
  }
}
