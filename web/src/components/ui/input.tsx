import * as React from "react";
import { MaskProps, useMask } from "@react-input/mask";

import { cn } from "@/lib/utils";
import { Saira_Extra_Condensed } from "next/font/google";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10  w-full rounded-md border border-input bg-gray-400 text-gray-700 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maskProps: MaskProps;
}

const MaskedInput = ({ maskProps, ...props }: MaskedInputProps) => {
  const inputRef = useMask(maskProps);

  return <Input ref={inputRef} {...props} />;
};

Input.displayName = "Input";

export { Input, MaskedInput };
