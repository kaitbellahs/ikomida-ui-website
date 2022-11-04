import { Network, Types } from '@ikomida/shared-frontend'

export async function doContract(object: Types.Classes.CContract) {
  const network: Network = Network.instance
  return network?.post('/contract', false, object, 'newContract')
}

export async function requestContact(object: Types.Classes.CContract) {
  const network: Network = Network.instance
  return network?.post('/requestContact', false, object, 'requestContact')
}

export async function GetAddressByCep(postalCode?: string) {
  const network: Network = Network.instance
  return network?.get(`/cep/${postalCode ?? '-'}`, false)
}

export async function requestPhoneValidation(object: Types.Classes.CContract) {
  const network: Network = Network.instance
  return network?.post('/contract/requestPhoneValidation', false, object, 'requestContractPhoneValidation')
}

export async function validatePhoneValidationCode(object: Types.Classes.CContract) {
  const network: Network = Network.instance
  return network?.post(
    '/contract/validatePhoneValidationCode',
    false,
    object,
    'validateContractPhoneValidationCode'
  )
}
