import 'whatwg-fetch';
import * as queryString from 'querystring';

export class AppService {
  private headers: Headers;
  constructor() {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   */
  public post(url: string, data: object) {
    const params = this.getRequestInit('POST');
    params.body = (JSON.stringify(data));

    return fetch(`${url}`, params)
      .then(response => this.statusError(response));
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   * @returns {Q.Promise<any>}
   */
  public get(url: string, data?: object) {
    let urlWithParams = url;

    if (data && Object.keys(data).length > 0) {
      urlWithParams += `? ${queryString.stringify(data)}`;
    }

    return fetch(`${urlWithParams}`, this.getRequestInit('GET'))
        .then(response => this.statusError(response));
  }

  /**
   *
   * @param {string} url
   * @param {object} data
   */
  public put(url: string, data: object) {
    const params = this.getRequestInit('PUT');
    params.body = (JSON.stringify(data));

    return fetch(`${url}`, params)
      .then(response => this.statusError(response));
  }

  /**
   *
   * @param {string} method
   * @returns {RequestInit}
   */
  private getRequestInit(method: string): RequestInit {
    return  {
      credentials: 'same-origin',
      method: `${method}`,
      headers: this.headers,
    };
  }

  /**
   *
   * @param response
   * @returns {Q.Promise<any>}
   */
  private statusError(response: any): Promise<any> {
    const json = response.json();
    return response.status >= 200 && response.status < 300 ?
      json : json.then((error: any) => { throw error; });
  }
}
