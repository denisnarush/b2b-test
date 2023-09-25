import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SocketService } from '@services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.startWorker();
  }

  ngOnDestroy(): void {
    this.socketService.terminateWorker();
  }
}
