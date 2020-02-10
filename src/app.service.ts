import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index() {
    return {
      'project domains': {
        entities: [
          {
            partner: {
              endpoints: {
                'GET /partner': { response: 'list all partners' },
                'POST /partner': { response: 'create new partner registry' },
                'GET /partner/:id': {
                  parameter: 'id',
                  response: 'find partner with specified id',
                },
                'GET /partner/search': {
                  'query attributes': {
                    lng: 'number, longitude',
                    lat: 'number, latitude',
                  },
                  response:
                    "search nearest partner considering each partner's coverage area",
                },
              },
            },
          },
        ],
      },
    };
  }
}
