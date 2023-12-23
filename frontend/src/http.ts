import { webAPIUrl } from './AppSettings';

export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
  accessToken?: string;
}

export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
  statusCode?: number;
}

export const http = async <RESB, REQB = undefined>(
  config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    if (config.accessToken) {
      headers.set('Authorization', `Bearer ${config.accessToken}`);
    }

    const request = new Request(`${webAPIUrl}${config.path}`, {
      method: config.method || 'GET',
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const response = await fetch(request);
    const contentType = response.headers.get('content-type');
    let body: any = null;

    if (contentType && contentType.indexOf('application/json') !== -1) {
      body = await response.json();
    }

    return {
      ok: response.ok,
      body,
      statusCode: response.status,
    };
  } catch (error) {
    console.error(`Error in HTTP request: ${error}`);
    return { ok: false, statusCode: 500 };
  }
};
