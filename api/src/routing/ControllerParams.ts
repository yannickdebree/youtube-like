import { Context } from 'koa'
import { Account } from '../../../domain'

export interface ControllerParams {
    context: Context
    connectedAccount?: Account
}
