import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { axiosClient } from "@/http/axios";
import { otpSchema } from "@/lib/validation";
import { IError, IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signIn } from 'next-auth/react'

const Verify = () => {
  const { email } = useAuth();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (otp: string) => {
      const { data } = await axiosClient.post<{ user: IUser }>(
        "/api/auth/verify",
        {
          email,
          otp,
        }
      );
      return data;
    },
    onSuccess: ({ user }) => {
      signIn('credentials', { email: user.email, callbackUrl: '/' })
      toast.success('Success', { description: "Successfuly verified" })
    },
    onError: (error: IError) => {
      if (error.response?.data?.message) {
        return toast.error("Error", {
          description: error.response.data.message,
        });
      }
      return toast.error("Error", { description: "Something went wrong" });
    },
  });

  function onSubmit(values: z.infer<typeof otpSchema>) {
    mutate(values.otp);
  }
  return (
    <div className="w-full">
      <p className="text-center text-muted-foreground text-sm">
        We have sent you an email with a verification code to your email
        address. Pleace enter the code bellow
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Username</Label>
                <FormControl>
                  <Input
                    disabled
                    className="h-10 bg-secondary"
                    placeholder="info@ixtiyor.ai"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <Label>One-Time Password</Label>
                <FormControl>
                  <InputOTP
                    disabled={isPending}
                    pattern={REGEXP_ONLY_DIGITS}
                    maxLength={6}
                    {...field}
                    className="w-full"
                  >
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={0}
                      />
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={1}
                      />
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={2}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={3}
                      />
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={4}
                      />
                      <InputOTPSlot
                        className="w-full dark:bg-primary-foreground bg-secondary"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            size={"lg"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Verify;
