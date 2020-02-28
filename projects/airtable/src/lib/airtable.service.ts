import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import _ from 'lodash';
import {forkJoin} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AirtableService {

    private baseUrl = 'https://api.airtable.com/v0/';
    // tslint:disable-next-line:variable-name
    private _apiKey: string;
    // tslint:disable-next-line:variable-name
    private _dbId: string;

    constructor(private httpClient: HttpClient) {
    }

    set dbId(value: string) {
        this._dbId = value;
    }

    set apiKey(value: string) {
        this._apiKey = value;
    }

    getList(
        table: string,
        fields: Array<string> = null,
        filterByFormula: string = null,
        maxRecords: number = null,
        pageSize: number = null,
        sort: Array<object> = null,
        view: string = null,
        cellFormat: string = null,
        timeZone: string = null,
        userLocale: string = null
    ) {
        const urlParts = [];

        if (fields) {
            urlParts.push(fields.map(item => 'fields[]=' + item).join('&'));
        }

        if (filterByFormula) {
            urlParts.push('filterByFormula=' + filterByFormula);
        }

        if (maxRecords) {
            urlParts.push('maxRecords=' + maxRecords);
        }

        if (pageSize) {
            urlParts.push('pageSize=' + maxRecords);
        }

        if (sort) {
            urlParts.push('sort=' + JSON.stringify(sort));
        }

        if (view) {
            urlParts.push('view=' + encodeURI(view));
        }

        if (cellFormat) {
            urlParts.push('cellFormat=' + cellFormat);
        }

        if (timeZone) {
            urlParts.push('timeZone=' + timeZone);
        }

        if (userLocale) {
            urlParts.push('userLocale=' + userLocale);
        }

        const url = this.baseUrl + this._dbId + '/' + table + (urlParts.length > 0 ? '?' + urlParts.join('&') : '');

        return this.httpClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + this._apiKey
            }
        });
    }

    getListByFieldValue(table: string, fieldName: string, fieldValue: string) {
        return this.getList(table, [fieldName], '{' + fieldName + '} = \'' + fieldValue + '\'');
    }

    getRecord(table: string, recordId: string) {
        const url = this.baseUrl + this._dbId + '/' + table + '/' + recordId;

        return this.httpClient.get(url, {
            headers: {
                Authorization: 'Bearer ' + this._apiKey
            }
        });
    }

    doInsert(table: string, fields: object) {
        const url = this.baseUrl + this._dbId + '/' + table;

        return this.httpClient.post(url, {
            records: [{
                fields
            }]
        }, {
            headers: {
                Authorization: 'Bearer ' + this._apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    doUpdate(table: string, recordId: string, fields: object) {
        const url = this.baseUrl + this._dbId + '/' + table;

        return this.httpClient.patch(url, {
            records: [{
                id: recordId,
                fields
            }]
        }, {
            headers: {
                Authorization: 'Bearer ' + this._apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    doDelete(table: string, recordIds: Array<string>) {
        if (recordIds.length === 0) {
            throw new Error('No record ids passed');
        }

        const urlRecords = recordIds.map(item => 'records[]=' + item).join('&');
        const url = this.baseUrl + this._dbId + '/' + table + '?' + urlRecords;

        return this.httpClient.delete(url, {
            headers: {
                Authorization: 'Bearer ' + this._apiKey
            }
        });
    }

    doTruncate(table: string) {
        this.getList(table).subscribe(response => {
            const observables = [];

            // @ts-ignore
            _.chunk(response.records.map(item => item.id), 10).forEach(ids => {
                observables.push(this.doDelete(table, ids));
            });

            if (observables.length > 0) {
                forkJoin(observables).subscribe(() => {
                    // @ts-ignore
                    if (typeof response.offset !== 'undefined') {
                        this.doTruncate(table);
                    }
                });
            }
        });

        return this;
    }

}
