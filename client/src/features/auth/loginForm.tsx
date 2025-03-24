import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginForm } from './useLoginForm';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorMessage
  } = useLoginForm();

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-center">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block text-black" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
              aria-invalid={errors.email ? "true" : "false"}
              disabled={isLoading}
              className={isLoading ? "opacity-70" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-black" htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
              aria-invalid={errors.password ? "true" : "false"}
              disabled={isLoading}
              className={isLoading ? "opacity-70" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : 'Login'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
