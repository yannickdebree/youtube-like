import { Service } from "typedi";
import { AccountsService } from "../accounts";
import { SignInDTO } from "./SignInDTO";

@Service()
export class AuthService {
    constructor(
        private readonly accountsService: AccountsService
    ) { }

    signIn(dto: SignInDTO) {
        if (!!dto.email) {
            const accountByEmail = this.accountsService.findByEmail(dto.email);
            if (accountByEmail?.getPassword().getValue() === dto.password?.getValue()) {
                return accountByEmail;
            }
        }
    }
}