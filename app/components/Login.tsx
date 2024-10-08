
"use client";
import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "./ui/label";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from 'next/navigation'




const schema = yup.object().shape({
    firstname: yup.string().required('First name is required').max(15, 'Max 15 chars').min(3, 'Min 3 chars'),
    lastname: yup.string().required('Last name is required').max(15, 'Max 15 chars').min(3, 'Min 3 chars'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'min 8 characters').required('Password is required'),
    repeatPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password')
});



type FormValues = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    repeatPassword: string;
};


export function SignupFormDemo() {

    const router = useRouter()


    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });


    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Imprime los valores del formulario en la consola
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then((response) => {
                router.push('/dashboard')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isErrors = (fieldName: keyof FormValues) => {
        const isTrue = errors[fieldName] ? true : false;
        return isTrue;
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Login
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Login to aceternity if you can because we don&apos;t have a login flow
                yet
            </p>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname"
                            style={{ color: isErrors('firstname') ? 'red' : 'white' }}
                        > {errors && errors.firstname ? errors.firstname.message : "First name"} </Label>
                        <Input id="firstname" placeholder="Tyler" type="text"  {...register('firstname', { required: 'First name is required' })} colorVar={isErrors("firstname")} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname"
                            style={{ color: isErrors('lastname') ? 'red' : 'white' }}

                        >{errors && errors.lastname ? errors.lastname.message : "Last name"}</Label>
                        <Input id="lastname" placeholder="Durden" type="text" {...register('lastname', { required: 'First name is required' })} colorVar={isErrors("lastname")} />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email"
                        style={{ color: isErrors('email') ? 'red' : 'white' }}
                    > {errors && errors.email ? errors.email.message : "Email"} </Label>
                    <Input id="email" placeholder="projectmayhem@fc.com" type="email"  {...register('email', { required: 'First name is required' })} colorVar={isErrors("email")} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password"
                        style={{ color: isErrors('password') ? 'red' : 'white' }}
                    >{errors && errors.password ? errors.password.message : "Password"}</Label>
                    <Input id="password" placeholder="••••••••" type="password" {...register('password', { required: 'First name is required' })} colorVar={isErrors("password")} />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="repeatpassword"
                        style={{ color: isErrors('repeatPassword') ? 'red' : 'white' }}
                    > {errors && errors.repeatPassword ? errors.repeatPassword.message : "Repeat password"} </Label>
                    <Input id="repeatpassword" placeholder="••••••••" type="password" {...register('repeatPassword', { required: 'First name is required' })} colorVar={isErrors("repeatPassword")} />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    // disabled={!isValid || !isDirty}
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            GitHub
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            OnlyFans
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
