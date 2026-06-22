import { faker } from '@faker-js/faker';

// Register data
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

// 👇 New generator for Company Profile completion flow
export function generateCompanyProfileData() {
  return {
    companyIdentity: {
      typeofCapital: 'FDI - Penanaman Modal Asing / Foreign Direct Investment',
      institutionType: 'NON',
      directorName: faker.person.fullName(),
      // companyEmail: faker.internet.email(),
      companyEmail: 'mindidjak@rapikicks.id',
      qualification: 'Small Business, Small Cooperative',
    },
    companyAddress: {
      address: faker.location.streetAddress(),
      province: 'DKI Jakarta Jakarta',
      city: 'Kota Adm. Jakarta Pusat',
      postalCode: faker.location.zipCode('#####'),
      phoneNumber: '62' + faker.string.numeric(10),
      handphoneNumber: '62' + faker.string.numeric(10),
    },
    boardMembers: [
      {
        handphoneNumber: '62' + faker.string.numeric(9),
        npwp: faker.string.numeric(16),
        position: faker.person.jobTitle(),
        email: faker.internet.email(),
        identityFilePath: 'fixtures/files/identity-file-1.pdf',
        npwpFilePath: 'fixtures/files/npwp-file-1.pdf',
      },
      {
        handphoneNumber: '62' + faker.string.numeric(9),
        npwp: faker.string.numeric(16),
        position: faker.person.jobTitle(),
        email: faker.internet.email(),
        identityFilePath: 'fixtures/files/identity-file-2.pdf',
        npwpFilePath: 'fixtures/files/npwp-file-2.pdf',
      }
    ]
  };
}