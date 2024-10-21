'use client'

import { Container } from '@/components/customComponents/Container'
import { DataSchema } from '@/zod/zodSchema'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { User } from '@prisma/client'
import { axiosInstance } from '@/utils/axiosInstance'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader } from '@/components/customComponents/Loader'
import { useToast } from '@/hooks/use-toast'

export default function DataFillForm({
    params,
}: {
    params: { bussinessName: string }
}) {
    const formSchema = DataSchema
    const [client, setClient] = useState<User>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(
                    `/api/v1/client/${params.bussinessName}`
                )
                // setClient(response.data.client)
                const client = response.data.client
                setClient(client)
                form.setValue("clientId", client.id)
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientId: 123,
        },
        mode: "onChange"
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        try {
            const response = await axiosInstance.post('/api/v1/data', values)
            console.log(response)
            window.location.href = client?.websiteUrl || "www.google.com"
        } catch (err) {
            console.log(err)
            toast({
                title: "Some Error Occured!",
                variant: "destructive"
            })
        }
    }

    return (
        error ?
        <div className='w-full text-center font-bold text-4xl'>
            404 Not Found
        </div>
        : !loading ?
        <Container className="flex flex-col items-center justify-center">
            <h1 className="w-[30%] text-center font-bold text-xl">
                Drink Free
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-[30%]">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex. John"
                                        {...field}
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
                            <FormItem>
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
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="FEMALE">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>Submit</Button>
                </form>
            </Form>
        </Container>
        : <Loader />
    )
}
