"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  TaccountSettingsSchema,
  accountSettingsSchema,
} from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";

import { trpc } from "@/trpc/client";
import { catchError } from "@/utils";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import type { serverClient } from "@/trpc/serverClient";

interface AccountFormProps {
  user: NonNullable<
    Awaited<
      ReturnType<(typeof serverClient)["user"]["getCurrentUser"]["query"]>
    >
  >;
}

const AccountForm: FC<AccountFormProps> = ({ user }) => {
  const router = useRouter();

  // const { data } = trpc.user.getCurrentUser.useQuery(undefined, {
  //   initialData: user,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  const form = useForm<TaccountSettingsSchema>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  const {
    mutate: updateUser,
    isLoading,
    variables,
  } = trpc.user.updateUser.useMutation({
    onSuccess: async () => {
      toast.success("Updated successfully");
    },
    onSettled: async () => {
      form.reset({
        email: variables?.email || "",
        first_name: variables?.first_name || "",
        last_name: variables?.last_name || "",
      });
    },
    onError: (err) => {
      catchError(err);
    },
  });

  async function onSubmit(data: TaccountSettingsSchema) {
    updateUser(data);
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>first name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <div className="flex justify-end gap-2 transition-all ">
            <Button
              variant="secondary"
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
              <span className="sr-only">cancel</span>
            </Button>
            <Button isLoading={isLoading}>Save</Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
