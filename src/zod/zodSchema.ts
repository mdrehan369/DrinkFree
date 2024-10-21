import { z } from 'zod'

export const Role = z.enum(['ADMIN', 'STAFF', 'CLIENT'])

export const Gender = z.enum(['MALE', 'FEMALE'], {
    required_error: 'Gender is required',
})

export const AddressSchema = z.object({
    city: z
        .string({ required_error: 'city is required' })
        .min(1, 'City is required'),
    state: z
        .string({ required_error: 'state is required' })
        .min(1, 'State is required'),
    country: z.string().default('India'),
    landmark: z
        .string({ required_error: 'landmark is required' })
        .min(1, 'Landmark is required'),
    street: z
        .string({ required_error: 'street is required' })
        .min(1, 'Street is required'),
    area: z
        .string({ required_error: 'area is required' })
        .min(1, 'Area is required'),
    pinCode: z
        .string({ required_error: 'pincode is required' })
        .min(1, 'Pincode is required'),
    houseNumber: z
        .string({ required_error: 'houseNumber is required' })
        .min(1, 'House Number is required'),
    floor: z
        .string({ required_error: 'floor is required' })
        .min(1, 'Floor is required'),
})

export const UserSchema = z
    .object({
        role: Role.default('CLIENT'),
        firstName: z
            .string({ required_error: 'firstName is required' })
            .min(1, 'First name is required'),
        lastName: z
            .string({ required_error: 'lastName is required' })
            .min(1, 'Last name is required'),
        phoneNumber: z
            .string({ required_error: 'phoneNumber is required' })
            .regex(new RegExp(/^(?:\+91|91)?[654789]\d{9}$/)),
        email: z
            .string({ required_error: 'email is required' })
            .email()
            .regex(
                new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            ),
        password: z
            .string({ required_error: 'password is required' })
            .min(1, 'Password is required'),
        bussinessName: z.string().optional(),
        address: AddressSchema,
        qrcode: z.string().optional(),
        websiteUrl: z.string().optional(),
    })
    .refine(
        (args) => {
            if (args.role == 'CLIENT')
                return (
                    args.bussinessName &&
                    args.bussinessName?.length != 0 &&
                    args.websiteUrl &&
                    args.websiteUrl?.length != 0
                )
            return true
        },
        {
            message: 'Client should have bussinessName, qrcode, and websiteUrl',
        }
    )

export const DataSchema = z.object({
    firstName: z.string({ required_error: 'First Name is required' }),
    lastName: z.string({ required_error: 'Last Name is required' }),
    phoneNumber: z
        .string({ required_error: 'Phone Number is required' })
        .refine(val => val.match(new RegExp(/^(?:\+91|91)?[645789]\d{9}$/)), { message: "Invalid Phone Number" }),
        // .regex(new RegExp(/^(?:\+91|91)?[645789]\d{9}$/)),
    email: z
        .string({ required_error: 'Email is required' })
        .email().refine(val => val.match(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)), { message: "Invalid Email Address" }),
    gender: Gender,
    clientId: z.number({ required_error: 'clientId is required' }),
})

export const UserSigninSchema = z.object({
    emailOrPhoneNumber: z
        .string({ required_error: 'Email or Phone Number required' })
        .refine(
            (val) =>
                val.match(new RegExp(/^(?:\+91|91)?[7896]\d{9}$/)) ||
                val.match(
                    new RegExp(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    )
                ),
            { message: 'Invalid Email Or PhoneNumber' }
        ),
    password: z
        .string({ required_error: 'Password required' })
        .refine((val) => val !== '', { message: 'Password is required' }),
})
