import { faker } from '@faker-js/faker';

export function generateVendorData() {
  return {
    domestic: {
      category: 'Goods & Services',
      entity: 'PT',
      vendorName: faker.company.name(),
      npwpNo: faker.string.numeric(16),
      picName: faker.person.fullName(),
      picEmail: faker.internet.email(),
      picPhone: '62' + faker.string.numeric(10),
      picNik: faker.string.numeric(16),
      owners: [
        {
          name: faker.person.fullName(),
          identityType: 'ktp',
          identityNo: faker.string.numeric(16)
        }
      ],
      administrators: [
        {
          name: faker.person.fullName(),
          identityType: 'ktp',
          identityNo: faker.string.numeric(16)
        }
      ]
    },
    international: {
      type: 'International',
      category: 'Services',
      entity: 'LLC',
      vendorName: faker.company.name(),
      taxRegistrationNumber: 'TAX-US-' + faker.string.numeric(9),
      picName: faker.person.fullName(),
      picEmail: faker.internet.email(),
      picPhone: '+1' + faker.string.numeric(10),
      picIdNumber: 'P' + faker.string.numeric(9),
    }
  };
}