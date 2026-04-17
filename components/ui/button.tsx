import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: ButtonVariant;
};

type ButtonLinkProps = SharedButtonProps & {
  href: string;
};

type ButtonActionProps = SharedButtonProps &
  {
    disabled?: boolean;
    href?: never;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
  };

function buildClassName(
  variant: ButtonVariant,
  fullWidth: boolean,
  className?: string,
) {
  return [
    "inline-flex min-h-12 items-center justify-center rounded-[1.4rem] border px-4 py-3 text-sm font-semibold tracking-[0.08em] uppercase transition disabled:cursor-not-allowed disabled:opacity-55",
    fullWidth ? "w-full" : "",
    variant === "primary"
      ? "border-accent bg-accent text-background hover:border-accent-strong hover:bg-accent-strong"
      : "",
    variant === "secondary"
      ? "border-border/50 bg-background/65 text-foreground hover:border-foreground/20 hover:bg-panel"
      : "",
    variant === "ghost"
      ? "border-transparent bg-transparent text-foreground/70 hover:text-foreground"
      : "",
    className ?? "",
  ].join(" ");
}

export function Button(props: ButtonLinkProps | ButtonActionProps) {
  const {
    children,
    className: customClassName,
    fullWidth = false,
    variant = "primary",
  } = props;
  const className = buildClassName(variant, fullWidth, customClassName);

  if (typeof props.href === "string") {
    return (
      <Link className={className} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {children}
    </button>
  );
}
