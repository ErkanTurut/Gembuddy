// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { type VariantProps, cva } from "class-variance-authority";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@gembuddy/ui/cn";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

function PageHeader({
  className,
  children,
  as: Comp = "section",
  ...props
}: PageHeaderProps) {
  return (
    <Comp className={cn("grid gap-1", className)} {...props}>
      {children}
    </Comp>
  );
}

const headingVariants = cva(
  "font-bold leading-tight tracking-tighter lg:leading-[1.1]",
  {
    variants: {
      size: {
        lg: "text-4xl md:text-5xl",
        md: "text-3xl md:text-4xl",
        sm: "text-2xl md:text-3xl",
        xs: "text-xl md:text-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function PageHeaderHeading({
  className,
  size,
  as: Comp = "h1",
  ...props
}: PageHeaderHeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
}

const descriptionVariants = cva("text-muted-foreground max-w-[750px]", {
  variants: {
    size: {
      lg: "text-lg sm:text-xl",
      md: "text-base sm:text-lg",
      sm: "text-sm sm:text-base",
      xs: "text-xs sm:text-sm",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface PageHeaderDescriptionProps
  extends React.ComponentProps<typeof Balancer>,
    VariantProps<typeof descriptionVariants> {}

function PageHeaderDescription({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <Balancer
      as="p"
      className={cn(descriptionVariants({ size, className }))}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderDescription, PageHeaderHeading };
