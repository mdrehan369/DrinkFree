import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs"

export const prismaClient = new PrismaClient().$extends({
    query: {
        user: {
            async create({ model, operation, args, query }) {
                const hashedPassword = bcryptjs.hashSync(args.data.password)
                args.data.password = hashedPassword
                return query(args)
            }
        }
    },
    model: {
        user: {
            checkPassword(hashedPassword: string, password: string) {
                return bcryptjs.compareSync(password, hashedPassword)
            }
        }
    }
})
