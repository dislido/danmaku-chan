import * as http from 'http';

export default class TanmakuServer {
  listener: (data: any) => void;
  server: http.Server;
  constructor(port = 4080) {
    this.server = http.createServer((req,res) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      }).on('end', () => {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error(e);
          console.log('errdata:',data, '\n---errend')
        }
        if (this.listener) this.listener(data);
      });
    
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end();
    }).listen(port);
  }

  listen(fn: (data: any) => void) {
    this.listener = fn;
  }
}

