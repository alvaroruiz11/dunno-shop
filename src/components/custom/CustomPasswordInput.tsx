import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import { useState, type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

export const CustomPasswordInput = ({
  placeholder = 'Password',
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className={props.className}>
      <InputGroupInput
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...props}
      />

      <InputGroupAddon align="inline-end">
        <button
          className="p-2 cursor-pointer"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <EyeIcon className="size-4" />
          ) : (
            <EyeOffIcon className="size-4" />
          )}
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
};
