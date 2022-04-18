import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import { AccountsService } from '../accounts'
import { API_SECRET } from '../../../utils'
import { SignInDTO } from './SignInDTO'

@Service()
export class AuthService {
    constructor(private readonly accountsService: AccountsService) {}

    signIn(dto: SignInDTO) {
        const email = dto.email
        if (!!email) {
            const accountByEmail = this.accountsService.findByEmail(email)
            // TODO: compare passwords with hashing function
            if (
                accountByEmail?.getPassword().getValue() ===
                dto.password?.getValue()
            ) {
                const accessToken = jwt.sign(
                    {
                        email,
                    },
                    API_SECRET
                )
                return { email: email.getValue(), accessToken }
            }
        }
    }
}
