import React from "react";

import Input from "../../../components/Input";

function SignInForm({ register, errors, watch, setValue, style }) {
  return (
    <div style={style}>
      <div className="">
        <Input
          placeholder="E-mail"
          value={watch("email")}
          onChange={(e) => setValue("email", e.target.value)}
          registerObject={register("email", {
            required: "Пожалуйста, введите ваш email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Неверный формат email",
            },
          })}
          errors={errors.email}
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      <div className="">
        <Input
          placeholder="Пароль"
          type="password"
          value={watch("password")}
          onChange={(e) => setValue("password", e.target.value)}
          registerObject={register("password", {
            required: "Пожалуйста, введите ваш пароль",
          })}
          errors={errors.password}
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
}

export default SignInForm;
