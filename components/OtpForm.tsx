'use client';
import { LocalStorageService, SessionStorageService } from "@/services";
import { FullPageSpinner } from "@/shared/components";
import { EMAIL_SESSION_STORAGE_KEY, OTP_TIMESTAMP_SESSION_STORAGE_KEY } from "@/utils";
import { ACCESS_TOKEN_STORAGE_KEY, OTP_VERIFICATION_MILLISECONDS, REFRESH_TOKEN_STORAGE_KEY, REMEMBER_USER_STORAGE_KEY, USER_TYPE_STORAGE_KEY } from "@/utils/constants";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ROUTES, ENDPOINTS } from "@/utils";
import { usePost } from "@/hooks/useAPIQueryHooks";
import { IOTPAPIResponse } from "@/types/auth";

type OTPVerificationPayload = {
  email: string;
  user_type: string;
  otp: string;
}

export function EmailVerificationOTPForm() {
  const [isCheckingSession, setISCheckingSession] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null)
  const [otp, setOtp] = useState<string[]>(Array(6).fill('')); // Initialize with 6 empty strings
  const inputRefs = Array(6).fill(null).map(() => useRef<HTMLInputElement>(null));

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const clearSession = () => {
    SessionStorageService.clear();
    LocalStorageService.remove(REMEMBER_USER_STORAGE_KEY)
  }

  useEffect(() => {
    const storedEmail = SessionStorageService.get(EMAIL_SESSION_STORAGE_KEY);
    const storedTimestamp = SessionStorageService.get(OTP_TIMESTAMP_SESSION_STORAGE_KEY);

    if (storedEmail && storedTimestamp) {
      setEmail(storedEmail)
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp > OTP_VERIFICATION_MILLISECONDS) {
        clearSession();
        setISCheckingSession(false);
        router.push(ROUTES.auth.login());
      }
    } else {
      router.push(ROUTES.auth.login())
    }

    setISCheckingSession(false);
  }, [router]);

  const clearAndGoBack = () => {
    clearSession();
    router.push(ROUTES.auth.login())
  }
  const { mutate: verifyOTP } = usePost<IOTPAPIResponse, OTPVerificationPayload>(ENDPOINTS.auth.otp(), (response) => {
    const rememberUser = LocalStorageService.get(REMEMBER_USER_STORAGE_KEY)
    const { access_token, refresh_token, user } = response;

    SessionStorageService.clear();
    if (rememberUser) {
      // persist across sessions
      LocalStorageService.set(ACCESS_TOKEN_STORAGE_KEY, access_token)
      LocalStorageService.set(REFRESH_TOKEN_STORAGE_KEY, refresh_token)
    } else {
      // persist for current session only
      SessionStorageService.set(ACCESS_TOKEN_STORAGE_KEY, access_token)
      SessionStorageService.set(REFRESH_TOKEN_STORAGE_KEY, refresh_token)
    }
  }, (error) => {
    console.error('Error', error)
    setError('Failed to verify code')
  });

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs[index + 1].current) {
      if (inputRefs[index + 1]?.current) inputRefs[index + 1].current!.focus();
    }
  };

  useEffect(() => {
    // handle pasting all six digits together
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData('text');
      if (pastedData && /^\d{6}$/.test(pastedData)) {
        e.preventDefault();
        const pastedOtp = pastedData.split('');
        setOtp(pastedOtp);
        pastedOtp.forEach((digit, index) => {
          if (inputRefs[index].current) {
            inputRefs[index].current.value = digit;
          }
        });
        if (inputRefs[5].current) {
          inputRefs[5].current.focus();
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [inputRefs]);

  const handleOTPVerification = () => {
    const userType = SessionStorageService.get(USER_TYPE_STORAGE_KEY)
    if (!userType || !email) {
      setError('Invalid verification flow. Please go back to login page and retry.');
      return;
    }

    verifyOTP({
      email,
      otp: otp.join(''),
      user_type: userType,
    })
  }

  if (isCheckingSession) return <FullPageSpinner />

  return (
    <section className="bg-white px-4 py-8 dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="bg-primary-600 hidden w-full max-w-md p-12 lg:block lg:h-screen">
          <div className="mb-8 flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center text-2xl font-semibold text-white"
            >
              <img alt="" src="./gh_small_logo.svg" className="mr-2 size-11" />
            </a>
            <button
              onClick={clearAndGoBack}
              className="text-primary-100 inline-flex items-center text-sm font-medium hover:underline"
            >
              <svg
                className="mr-1 size-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Go back
            </button>
          </div>
        </div>
        <div className="mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0">
          <div className="w-full">
            <div className="mb-8 flex items-center justify-center space-x-4 lg:hidden">
              <a href="#" className="flex items-center text-2xl font-semibold">
                <img
                  alt=""
                  className="mr-2 size-8"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <span className="text-gray-900 dark:text-white">Flowbite</span>
              </a>
            </div>
            <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Verify your email address
            </h1>
            {!!email ? <p className="text-gray-500 dark:text-gray-400">
              We emailed you a six-digit code to&nbsp;
              <span className="font-medium text-gray-900 dark:text-white">
                {email}
              </span>
              . Enter the code below to confirm your email address.
            </p> : <p>We emailed you a six-digit code.</p>}

            {/* <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
                <div>
                  <label htmlFor="code-1" className="sr-only">
                    First code
                  </label>
                  <input
                    id="code-1"
                    maxLength={1}
                    onKeyUp={() =>
                      (
                        document.querySelector("#code-2") as HTMLInputElement
                      )?.focus()
                    }
                    required
                    type="text"
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                  />
                </div>
                <div>
                  <label htmlFor="code-2" className="sr-only">
                    Second code
                  </label>
                  <input
                    id="code-2"
                    maxLength={1}
                    onKeyUp={() =>
                      (
                        document.querySelector("#code-3") as HTMLInputElement
                      )?.focus()
                    }
                    type="text"
                    required
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                  />
                </div>
                <div>
                  <label htmlFor="code-3" className="sr-only">
                    Third code
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    id="code-3"
                    onKeyUp={() =>
                      (
                        document.querySelector("#code-4") as HTMLInputElement
                      )?.focus()
                    }
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="code-4" className="sr-only">
                    Fourth code
                  </label>
                  <input
                    id="code-4"
                    maxLength={1}
                    onKeyUp={() =>
                      (
                        document.querySelector("#code-5") as HTMLInputElement
                      )?.focus()
                    }
                    required
                    type="text"
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                  />
                </div>
                <div>
                  <label htmlFor="code-5" className="sr-only">
                    Fifth code
                  </label>
                  <input
                    id="code-5"
                    maxLength={1}
                    onKeyUp={() =>
                      (
                        document.querySelector("#code-6") as HTMLInputElement
                      )?.focus()
                    }
                    required
                    type="text"
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                  />
                </div>
                <div>
                  <label htmlFor="code-6" className="sr-only">
                    Sixth code
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    id="code-6"
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                    required
                  />
                </div>
              </div> */}

            <div className="my-4 flex space-x-2 sm:space-x-4 md:my-6">
              {Array(6).fill(null).map((_, index) => (
                <div key={index}>
                  <label htmlFor={`code-${index + 1}`} className="sr-only">
                    {`Code ${index + 1}`}
                  </label>
                  <input
                    ref={inputRefs[index]}
                    id={`code-${index + 1}`}
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        if (inputRefs[index - 1].current) {
                          inputRefs[index - 1].current!.focus();
                        }
                      }
                    }}
                    type="text"
                    className="focus:border-ghred-500 focus:ring-ghred-500 dark:focus:border-ghred-500 dark:focus:ring-ghred-500 block size-12 rounded-lg border border-gray-300 bg-white py-3 text-center text-2xl font-extrabold text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:size-16 sm:py-4 sm:text-4xl"
                    required
                  />
                </div>
              ))}
            </div>
            <p className="mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 md:mb-6">
              Make sure to keep this window open while checking your inbox.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="submit"
                size="xl"
                className="[&>span]:text-sm bg-ghred-500 hover:!bg-ghred-600 w-full"
                onClick={handleOTPVerification}
              >
                Verify account
              </Button>
            </div>
            {!!error && <p className="text-sm text-red-500 my-2">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
