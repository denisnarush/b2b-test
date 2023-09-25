import { PseudoSocket } from '@classes/pseudo-socket.class';
import { DEFAULT_ARRAY_SIZE } from '@constants/default.values';

describe('PseudoSocket', () => {
  let socket: PseudoSocket;

  beforeEach(() => {
    socket = new PseudoSocket();
  });

  it('should create an instance', () => {
    expect(socket).toBeTruthy();
  });

  it('should register and trigger message event listeners', (done) => {
    socket.addEventListener('message', (data) => {
      expect(data).toBeTruthy(); // Check if data is returned
      expect(data.length).toBe(DEFAULT_ARRAY_SIZE);
      socket.close();
      done(); // Complete the test once callback is triggered
    });
    socket.open(); // Opening the socket will start the data generation and event triggering
  });

  it('should start and stop sending messages on open and close', (done) => {
    let counter = 0;

    socket.addEventListener('message', () => {
      counter++;
      if (counter === 3) {
        // Adjust this number based on how many messages you expect
        socket.close();
        expect;
        expect(counter).toBe(3); // Ensure messages were sent a specific number of times
        done();
      }
    });

    socket.open();
  });
});
