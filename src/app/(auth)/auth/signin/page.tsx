'use client'
// components/SignInForm.js
import { useState } from 'react'
import { axiosInstance } from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { UserSigninSchema } from '@/zod/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Container } from '@/components/customComponents/Container'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

const SignInForm = () => {
    const [showPass, setShowPass] = useState(false)

    const formSchema = UserSigninSchema

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailOrPhoneNumber: '',
            password: '',
        },
		mode: "onChange"
    })

    const router = useRouter()
	const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            const response = await axiosInstance.post('/api/v1/signin', values)
            console.log(response)
            router.push('/')
			toast({title: "Logged In Successfully", variant: "default", className: "bg-green-500"})
        } catch (error) {
			if(axios.isAxiosError(error)) {
				toast({title: error.response?.data.message || "Something went wrong", variant: "destructive"})
			} else {
				toast({title: "Something went wrong", description: "Please try again later!", variant: "destructive"})
			}
            console.log(error)
        }
    }
    return (
        <Container className=" flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold text-center">Sign In</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 border-2 border-gray-200 w-[30%] px-10 py-14 rounded-lg">
                    <FormField
                        control={form.control}
                        name="emailOrPhoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Or Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex. John@example.com or 1234567891"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="8+ characters"
                                        type={showPass ? 'text' : 'password'}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=' flex items-center justify-start gap-2'>
                        <Checkbox
                            onClick={() => setShowPass((prev) => !prev)}
                        />
                        <Label>Show Password</Label>
                    </div>
                    <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting} >Submit</Button>
                </form>
            </Form>
        </Container>
    )
}

export default SignInForm
