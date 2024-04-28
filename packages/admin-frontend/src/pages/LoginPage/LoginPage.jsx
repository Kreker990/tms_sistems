import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { storeToken, TokenTypes } from "../../auth/tokenRepository";
import { signInUser } from "../../auth/authService";

import SignInForm from "./components/SignInForm";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "alex@potapov.tech",
      password: "letmein",
    },
  });

  const mutation = useMutation(signInUser, {
    onSuccess: (data) => {
      console.log({ onSuccess: data });
      storeToken(TokenTypes.ACCESS, data.accessToken);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl mb-4 font-bold text-gray-700">Про тебя - Вход</h2>

        <SignInForm
          className=""
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default SignIn;
