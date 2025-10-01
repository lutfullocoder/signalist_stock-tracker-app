'use client'
import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignInFormData>(
        {
            defaultValues: {
                email: '',
                password: '',
            },
            mode: 'onBlur'
        }
    )

    const onSubmit: SubmitHandler<SignInFormData> = (data) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1 className={'form-title'}>Welcome back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-5'}>

                <InputField
                    name={'email'}
                    type={'email'}
                    label={'Email'}
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
