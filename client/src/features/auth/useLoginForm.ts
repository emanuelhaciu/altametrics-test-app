import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from "@/providers/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";

// Create login validation schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(3, "Password must be at least 3 characters")
});

// Type for our form data that's validated by Zod
type LoginFormData = z.infer<typeof loginSchema>;

interface LocationState {
  from?: { pathname: string };
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || "/invoices";

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Setup login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      return login({ ...credentials });
    },
    onSuccess: (userData) => {
      dispatch(setUser(userData));
      navigate(from, { replace: true });
      reset();
    }
  });

  // Form submission handler that triggers the mutation
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: loginMutation.isPending,
    errorMessage: loginMutation.error ? (loginMutation.error as Error).message : undefined,
    reset
  };
};