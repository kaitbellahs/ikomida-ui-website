
import { Types } from '@ikomida/shared-frontend'

export default class Helper {
    static daysToMonths(days: number) {
        const months = Math.floor(days / 30)
        const leftDays = days - months * 30
        let leftDaysString = months > 0 && leftDays > 0 ? ` e ` : ''
        leftDaysString += leftDays > 0 ? `${leftDays} dia${months > 1 ? 's' : ''}` : ''
        return `${months > 0 ? `${months} ${Helper.isPlural(days) ? 'meses' : 'mês'}` : ''}${leftDaysString}`
    }

    static isPlural(days: number) {
        return Math.floor(days / 30) > 1 || days - Math.floor(days / 30) * 30 > 1
    }

    static promoPlan(plan: Types.Classes.CPlan, promoTime: Date, clickId?: string | null) {
        plan.dueDateAfterXDays = plan.dueDateAfterXDays && clickId && promoTime > new Date ? plan.dueDateAfterXDays : 0
        return plan.toJSON()
    }
}