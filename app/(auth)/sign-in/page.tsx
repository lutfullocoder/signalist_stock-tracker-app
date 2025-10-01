'use client'
import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import {useRouter} from "next/navigation";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";

const SignIn = () => {
    const router = useRouter()
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInFormData>(
        {
            defaultValues: {
                email: '',
                password: '',
            },
            mode: 'onBlur'
        }
    )

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        try {
            const result = await signInWithEmail(data)
            if(result.success) router.push("/")
        } catch (error) {
            console.log(error)
            toast.error('Sign in failed', {
                description: error instanceof Error ? error.message : "Failed to sign in",
            });
        }
    }

    return (
        <>
            <h1 className={'form-title'}>Welcome back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-5'}>

                <InputField
                    name={'email'}
                    label={'Email'}
                    type={'email'}
                    placeholder={'contact@gmail.com'}
                    register={register}
                    error={errors.email}
                    validation={{required: "Email is required", pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required'}}
                />
                <InputField
                    name={'password'}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    type={'password'}
                    register={register}
                    error={errors.password}
                    validation={{required: "Password is required", minLength: 8}}
                />


                <Button type='submit' disabled={isSubmitting} className={'yellow-btn w-full mt-5'}>
                    {isSubmitting ? 'Signing in' : 'Sign in'}
                </Button>

                <FooterLink text={"Don't have an account?"} linkText={"Sign up"} href={'/sign-up'}/>
            </form>
        </>
    )
}
export default SignIn
