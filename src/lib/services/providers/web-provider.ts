import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebProviderService {
    private xml: string | undefined;

    public async read(...path: string[]) {
        const url = '/public/' + path.join('/');
        if (this.xml === undefined) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load XML from ${url}: ${response.statusText}`);
            }
            this.xml = await response.text();
        }
        return this.xml;
    }
}