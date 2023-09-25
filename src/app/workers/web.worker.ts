/// <reference lib="webworker" />

import { PseudoSocket } from '@classes/pseudo-socket.class';
import { PSEUDO_SOCKET_TYPES } from '@constants/pseudo-socket.types';
import { WORKER_EVENTS } from '@constants/worker.events';

const socket = new PseudoSocket();

let additional: Array<string> = [];

addEventListener('message', ({ data }) => {
  const { type } = data;

  if (type === WORKER_EVENTS.INIT) {
    socket.open();
    socket.addEventListener('message', (data) => {
      const set = new Set(data.slice(-10));
      data
        .filter((item) => additional.includes(item.id))
        .forEach((item) => set.add(item));

      postMessage(Array.from(set));
    });
  }

  if (type === WORKER_EVENTS.SETTINGS) {
    const { settings } = data;

    additional = settings.additional ?? [];

    socket.send(
      JSON.stringify({ type: PSEUDO_SOCKET_TYPES.SETTINGS, data: settings })
    );
  }

  if (type === WORKER_EVENTS.COMPLETE) {
    socket.close();
  }
});
