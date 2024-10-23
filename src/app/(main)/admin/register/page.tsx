'use client'

import { Container } from '@/components/customComponents/Container'
import { UserSchema } from '@/zod/zodSchema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { axiosInstance } from '@/utils/axiosInstance'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Register() {
    const formSchema = UserSchema
    const [cpassword, setCpassword] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            role: "STAFF"
        }
    })
    const { toast } = useToast()
    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if(values.password != cpassword) {
            toast({
                title: "Password and confirm password should match!",
                variant: "destructive"
            })
            return
        }
        try {
            const response = await axiosInstance.post("/api/v1/register", values)
            console.log(response)
            toast({
                title: "User registered successfully!",
                className: "bg-green-500"
            })
            router.push("/admin")
        } catch (error) {
            if(axios.isAxiosError(error)) {
				toast({title: error.response?.data.message || "Something went wrong", description: error.response?.data.submessage || "", variant: "destructive"})
			} else {
				toast({title: "Something went wrong", description: "Please try again later!", variant: "destructive"})
			}
            console.log(error)
        }
    }

    return (
        <Container className="w-[80vw] h-auto flex flex-col items-center justify-start pt-20 pb-10 pr-0">
            <Form {...form}>
                <h1 className="text-xl font-bold w-[80%] py-4 underline">
                    Personal Details
                </h1>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-[80%]">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Register for</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={'STAFF'}
                                        className="flex flex-row space-x-4">
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="STAFF" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Staff
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="CLIENT" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Client
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className=" flex items-center justify-center gap-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. John"
                                            {...field}
                                            type=""
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Smith"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex. john@example.com"
                                        {...field}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex. 1234567891"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex items-center justify-center gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="8+ characters"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem className="w-full">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="8+ characters" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </div>

                    <h1 className="text-xl font-bold w-[80%] py-4 underline">
                        Address Details
                    </h1>

                    <div className="w-full flex items-center justify-center gap-2">
                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Kolkata"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. West Bengal"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.country"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. India"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <FormField
                            control={form.control}
                            name="address.area"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Park Circus"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.street"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Karaya Road"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.landmark"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Landmark</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. Royal Sweets"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center gap-2">
                        <FormField
                            control={form.control}
                            name="address.pinCode"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Pin Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. 700017"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.houseNumber"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>House Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. 18"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address.floor"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Floor</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex. 1st"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {form.watch('role') === 'CLIENT' && (
                        <div className="w-full">
                            <h1 className="text-xl font-bold w-[80%] py-4 underline">
                                Bussiness Details
                            </h1>
                            <div className="w-full flex items-center justify-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="bussinessName"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>
                                                Bussiness Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex. Google"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="websiteUrl"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Website URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex. https://google.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>Submit</Button>
                </form>
            </Form>
        </Container>
    )
}
