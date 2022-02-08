import ip from 'ip';
import ping from 'ping';

class Api {
  get useBackup(): boolean {
    const addr = ip.address();

    return !(ip.isPrivate(addr) && addr.startsWith(process.env.ROUTER_IP!));
  }

  async ping(ip: string) {
    return await ping.promise.probe(ip);
  }
}

export const api = new Api();
export default api;
