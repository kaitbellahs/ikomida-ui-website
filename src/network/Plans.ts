import { Network, Types } from '@ikomida/shared-frontend'

export async function getPlans() {
  const response = await Network.instance?.get('/plans')
  if (response && response.success) {
    const data: Types.Classes.CPlan[] = Types.Classes.CPlan.fromObject(response.data)
    return data
  }
  return []
}

export async function getPlan(id?: string) {
  return await Network.instance?.get(`/plan/${id}`)
}
