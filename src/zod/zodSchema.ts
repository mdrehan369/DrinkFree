import { z } from 'zod'

export const Role = z.enum(['ADMIN', 'STAFF', 'CLIENT'])

export const Gender = z.enum(["MALE", "FEMALE"], {required_error: "Gender is required"})

export const AddressSchema = z.object({
    city: z.string({ required_error: "city is required" }),
    state: z.string({ required_error: "state is required" }),
    country: z.string().default("India"),
    landmark: z.string({ required_error: "landmark is required" }),
    street: z.string({ required_error: "street is required" }),
    area: z.string({ required_error: "area is required" }),
    pinCode: z.number({ required_error: "pincode is required" }),
    houseNumber: z.number({ required_error: "houseNumber is required" }),
    floor: z.number({ required_error: "floor is required" }),
})

export const UserSchema = z.object({
    role: Role.default('CLIENT'),
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    phoneNumber: z.string({ required_error: "phoneNumber is required" }).regex(new RegExp("^(?:\+91|91)?[789]\d{9}$")),
    email: z.string({ required_error: "email is required" }).email().regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")),
    password: z.string({ required_error: "password is required" }),
    bussinessName: z.string().optional(),
    address: AddressSchema,
    qrcode: z.string().optional(),
    websiteUrl: z.string().optional(),
}).refine(args => {
    if(args.role === "CLIENT")
        return args.bussinessName?.length != 0
            && args.qrcode?.length != 0
            && args.websiteUrl?.length != 0
}, {
    message: "Client should have bussinessName, qrcode, and websiteUrl"
})

export const DataSchema = z.object({
    firstName: z.string({ required_error: "firstName is required" }),
    lastName: z.string({ required_error: "lastName is required" }),
    phoneNumber: z.string({ required_error: "phoneNumber is required" }).regex(new RegExp("^(?:\+91|91)?[789]\d{9}$")),
    email: z.string({ required_error: "email is required" }).email().regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")),
    gender: Gender,
    clientId: z.number({ required_error: "clientId is required" })
})

export const UserSigninSchema = z.object({
    emailOrPhoneNumber: z.string().refine(val => val.match(new RegExp("^(?:\+91|91)?[789]\d{9}$")) || val.match(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")), { message: "Invalid Email Or PhoneNumber" }),
    password: z.string({ required_error: "Password required" })
})