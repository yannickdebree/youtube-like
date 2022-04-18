import jwt from 'jsonwebtoken'
import { Service } from 'typedi'
import { API_SECRET } from '../../../utils'
import { AccountsService } from '../accounts'
import { SignInDTO } from './SignInDTO'

@Service()
export class AuthService {
    constructor(private readonly accountsService: AccountsService) { }

    async signIn(dto: SignInDTO) {
        const email = dto.email
        if (!!email) {
            const accountByEmail = await this.accountsService.findByEmail(email)
            // TODO: compare passwords with hashing function
            if (
                accountByEmail?.getPassword()?.getValue() ===
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
