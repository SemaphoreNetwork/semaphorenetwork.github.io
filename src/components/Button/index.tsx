import { cva } from 'class-variance-authority';
import { cn } from 'utils';

type ButtonProps = {
  className?: string;
  image?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | null | undefined;
  text: string;
};

const buttonVariants = cva(
  `cursor-pointer flex items-center gap-1 justify-center rounded py-4 px-10`,
  {
    variants: {
      variant: {
        default: 'border border-cinder-950 bg-sn-yellow-400',
        outline: 'border border-sn-yellow-400 text-sn-yellow-400',
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  }
);

export default function Button({
  className,
  image,
  onClick,
  variant = 'default',
  text,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={cn(buttonVariants({ className, variant }))}
      onClick={onClick}
    >
      {text}
      {image && <img alt='Button icon' src={image} />}
    </button>
  );
}
