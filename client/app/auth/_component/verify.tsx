import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { otpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import z from "zod";

const Verify = () => {
  const { email } = useAuth();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values);
    window.open("/", "_self");
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
          <Button type="submit" className="w-full" size={"lg"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Verify;
