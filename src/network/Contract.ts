import {
    Network, Types
} from "@ikomida/shared-frontend";

export async function doContract(object: Types.Classes.CContract) {
    return Network.instance?.post("/contract", false, object, "newContract");
}

export async function GetAddressByCep(postalCode?: string) {
    return Network.instance?.get(`/cep/${postalCode ?? '-'}`, false);
}

export async function requestPhoneValidation(object: Types.Classes.CContract) {
    return Network.instance?.post("/contract/requestPhoneValidation", false, object, "requestContractPhoneValidation");
}

export async function validatePhoneValidationCode(object: Types.Classes.CContract) {
    return Network.instance?.post("/contract/validatePhoneValidationCode", false, object, "validateContractPhoneValidationCode");
}