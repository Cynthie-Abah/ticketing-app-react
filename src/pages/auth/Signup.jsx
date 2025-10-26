import { Ticket, Mail,  AlertCircle} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import PasswordInput from '../../components/PasswordInput';

export default function SignupPage() {
  const {register, handleSubmit, formState: {errors, isSubmitting}, watch, } = useForm();
  const password = watch("password"); 
  const {signUp} = useAuth()

  const onSubmit = async ({email, password}) => {
try {
      await signUp(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full">
            <Ticket className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-8">Start managing your tickets today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                {...register('email', { 
                required: 'Email is required', 
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: 'Please enter a valid email address' 
                } 
              })}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm" id="email-error" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <PasswordInput
                errors
                id="password"
                {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                },
              })}
                placeholder="Enter your Password here"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm" id="password-error" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <PasswordInput
                errors
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Re-enter your password"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                />

            {errors.confirmPassword && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm" id="confirm-password-error" role="alert">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.confirmPassword.message}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 font-semibold hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
