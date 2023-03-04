import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    // handleSubmit va a validar el form antes del onSubmit del HTML(la lib va antes)
    // todas las validaciones van antes de esto tmb,obviamente
    handleSubmit,
    // fijate de donde salen los errors(siempre trabajar con la docu)
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/images/netflix-logo.svg" />
      </Head>
      <Image
        src="/images/matoBg.jpg"
        priority
        alt="login-img"
        fill
        className="-z-10 !hidden opacity-60 sm:!inline"
        style={{
          objectFit: "cover",
        }}
      />
      <img
        src="/images/netflix-logo.svg"
        // fijate la importancia de objet-contain en un svg,ya que esta img es un svg
        className="absolute left-3 top-3 cursor-pointer object-contain md:left-6 md:top-4 bg-black py-3 px-5 rounded-lg"
        width={150}
        height={150}
      />

      <form
        // y por esto el handleSubmit llama al onSubmit,para situarse primero y llamarlo despues
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          {/* ojo que las label hay que ponerlas en inline-block para que pillen el ancho con w-full y el space-y-4 del padre */}
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <button className="text-white hover:underline" onClick={() => setLogin(false)}>
            &nbsp;Sign up now
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Login;
