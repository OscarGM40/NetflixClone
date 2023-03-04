import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User, //for typing
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";

// typing for default authContext values
interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}
// ojo con los values de las async functions
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// fijate que este modulo exporta una named function que es el HOC AuthProvider(que tendrá los children solo si no es el primer render) y la llamada al provider como la default exp
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  // ojo con el type User que viene de firebase y con la nulidad inicial
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // initialLoading va a bloquear la UI
  const [initialLoading, setInitialLoading] = useState(true);

  // el efecto es necesario para que persista el logeo entre refresh
  useEffect(
    () =>
      // este método pide la auth de la app y constantemente me retorna el user.Si lo hay lo persistimos,si no lo redirigimos
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in
          setUser(user);
          setLoading(false);
            router.push("/");
        } else {
          // Not logged in
          setUser(null);
          setLoading(true);
          // fijate que cuando hagamos logout y establecemos el user a null la dependencia auth cambiar y dispara el efecto,entra por el else y dispara este push.Interesting
          router.push("/login");
        }
        setInitialLoading(false);
      }),
      // no hace falta pasar auth como dependencia ya que no va a cambiar
    [],
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    //  auth ya lo estamos exportando en el firebase.ts,es una instancia de clase Auth
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // el user viene en la resp.user
        setUser(userCredentials.user);
        toast("🦄 User registered succesfully!", {
          position: "top-right",
          autoClose: 5000,
          role: "success",
          closeOnClick: true,
          theme: "dark",
        });
      })
      .catch((error) =>
        toast(`Error registering user: ${error.message}`, {
          position: "top-right",
          autoClose: 4000,
          role: "error",
          closeOnClick: true,
          theme: "light",
        }),
      )
      // mejor setear asi el loading a false y no repetirse
      .finally(() => setLoading(false));
  };
  // fijate como en auth viene toda la autenticación relacionada a esta app.Amazing
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        toast("🦄 User logged succesfully!", {
          position: "top-right",
          autoClose: 5000,
          role: "success",
          closeOnClick: true,
          theme: "dark",
        });
      })
      .catch((error) =>
        toast(`Error loging in user: ${error.message}`, {
          position: "top-right",
          autoClose: 4000,
          role: "error",
          closeOnClick: true,
          theme: "light",
        }),
      )
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    // signOut la expone firebase tmb
    await signOut(auth)
      .then(() => setUser(null))
      .catch((error) => alert(`Error while loging out: ${error.message}`))
      .finally(() => setLoading(false));
  };

  // this increase the performance(why?? => entiendo que porque solo lo va a recomputar si cambian las dependencias y que antes lo iba a hacer más veces).Fijate que memoedValue es un simple objet que va a cumplir con la interface IAuth,logicamente
  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
    }),
    [user, loading, error],
  );

  return (
    // it looks that !initialLoading && children causes client-side rendering...
    <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
  );
};

// ojo que exportamos por defecto simplemente la llamada al useContext(AuthContext)
export default function useAuth() {
  return useContext(AuthContext);
}
