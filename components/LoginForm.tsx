'use client'
import { usePost } from "@/hooks/useAPIQueryHooks";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LocalStorageService, SessionStorageService } from "@/services";
import { validateEmail, validatePassword } from "@/utils/validation";
import { FullPageSpinner } from "@/shared/components";
import { EMAIL_SESSION_STORAGE_KEY, OTP_TIMESTAMP_SESSION_STORAGE_KEY } from "@/utils";
import { OTP_VERIFICATION_MILLISECONDS, REMEMBER_USER_STORAGE_KEY, USER_TYPE_STORAGE_KEY } from "@/libs/constants";
import { ROUTES, ENDPOINTS } from "@/utils";
import { APIError } from "@/types";
import { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  user_type: string;
  password: string;
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingSession, setISCheckingSession] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null)

  const router = useRouter();

  useEffect(() => {
    const storedEmail = SessionStorageService.get(EMAIL_SESSION_STORAGE_KEY);
    const storedTimestamp = SessionStorageService.get(OTP_TIMESTAMP_SESSION_STORAGE_KEY);

    if (storedEmail && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();
      if (now - timestamp < OTP_VERIFICATION_MILLISECONDS) {
        router.push(ROUTES.auth.OTP());
      } else {
        SessionStorageService.clear();
        LocalStorageService.remove(REMEMBER_USER_STORAGE_KEY);
      }
    }

    setISCheckingSession(false);
  }, [router]);

  const { mutate: login, isPending: isLoginLoading } = usePost<null, LoginPayload>(
    ENDPOINTS.auth.login(),
    () => {
      SessionStorageService.set(EMAIL_SESSION_STORAGE_KEY, email);
      SessionStorageService.set(OTP_TIMESTAMP_SESSION_STORAGE_KEY, Date.now().toString());
      SessionStorageService.set(USER_TYPE_STORAGE_KEY, 'root')

      if (rememberMe) LocalStorageService.set(REMEMBER_USER_STORAGE_KEY, 'true')
      else LocalStorageService.remove(REMEMBER_USER_STORAGE_KEY);

      router.push(ROUTES.auth.OTP());
    },
    (error: AxiosError<APIError>) => {
      const message = error.response?.data.detail;
      if (message) setLoginError(message)
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError)
      return;
    }

    login({
      email,
      user_type: 'root', // once there are more roles, this would come from a role selection logic
      password,
    });
  };


  if (isCheckingSession) return <FullPageSpinner />

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <img className="mb-6 mr-2" src="./gh_full_logo.svg" alt="logo" />
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <Card className="shadow-none">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={(event) => handleSubmit(event)}>
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">
                  Your email
                </Label>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  className="bg-ghred-50 text-ghred-900 placeholder:text-ghred-700 focus:border-ghred-500 focus:ring-ghred-500 dark:border-ghred-400 dark:bg-ghred-100 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 border-cyan-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-red-500 text-sm text-center my-1">{emailError}</p>}
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="mb-2 block dark:text-white"
                >
                  Password
                </Label>
                <TextInput
                  id="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  className="bg-ghred-50 text-ghred-900 placeholder:text-ghred-700 focus:border-ghred-500 focus:ring-ghred-500 dark:border-ghred-400 dark:bg-ghred-100 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 border-cyan-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm text-center my-1">{passwordError}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <Checkbox id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="bg-ghred-500 hover:!bg-ghred-600 w-full"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Signing in..." : "Sign in"}
              </Button>
              {!!loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Don’t have an account yet?&nbsp;
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}