import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-btn text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20",
        destructive:
          "bg-error text-error-content hover:bg-error/90 shadow-lg shadow-error/20",
        outline:
          "border border-base-300 bg-transparent text-base-content hover:bg-base-200 hover:border-base-content/20",
        secondary:
          "bg-secondary text-secondary-content hover:bg-secondary/90 shadow-md",
        ghost: "text-base-content/60 hover:text-base-content hover:bg-base-200",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
