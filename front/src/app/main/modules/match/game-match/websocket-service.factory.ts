import { Socket } from 'ngx-socket-io';
import { environment } from '@root/environments/environment';
import { SocketIoConfig } from 'ngx-socket-io/src/config/socket-io.config';

export class WebsocketServiceFactory {
  create() {
    const config: SocketIoConfig = {
      url: environment.apiWsUrl,
      options: {
        autoConnect: false,
      },
    }

    return new Socket(config);
  }
}
