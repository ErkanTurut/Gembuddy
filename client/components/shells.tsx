import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const shellVariants = cva("grid items-start gap-8 pb-8 pt-6 md:py-2", {
  variants: {
    variant: {
      default: "container",
      sidebar: "w-full p-2",
      centered: "mx-auto mb-16 mt-20 max-w-md justify-center",
      markdown: "container max-w-3xl gap-0 py-8 md:py-10 lg:py-10",
      left: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

const Shell: React.FC<ShellProps> = ({
  className,
  as: Comp = "section",
  variant,
  ...props
}) => {
  return (
    <Comp className={cn(shellVariants({ variant }), className)} {...props} />
  );
};

export { Shell, shellVariants };
