import faker from 'faker'
import { traderCountry, traderCountryCode } from '@fixtures/trader-currency-and-country.json'

export const generateEmail = () => `${faker.name.firstName().toLowerCase()}${faker.random.number()}@example.com`

export const generatePassword = () => `${faker.internet.password()}A1+`

export const generateCompanyName = () => faker.company.companyName()

export const generateTrader = () => ({
  email: generateEmail(),
  password: generatePassword(),
  countryCode: traderCountryCode,
})

export const generateBusinessForAPI = () => ({
  businessTitle: generateCompanyName(),
  businessEmail: generateEmail(),
  businessCountryCode: traderCountryCode,
  businessWebsite: `https://www.${faker.internet.domainWord()}.com`
})

export const generateBusinessForUiRegistration = () => ({
  businessTitle: generateCompanyName(),
  businessEmail: generateEmail(),
  businessCountry: traderCountry,
  businessWebsite: `www.${faker.internet.domainWord()}.com`
})

export const generateTier1VerificationInfo = () => ({
  country: 'Lithuania',
  street: 'Gatvės g.',
  town: 'Miestas',
  postalCode: '12345',
  firstName: 'Vardenis',
  lastName: 'Pavardenis'
})
