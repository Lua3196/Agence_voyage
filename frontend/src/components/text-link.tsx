import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function TextLink({
    href,
    className,
    children,
    ...props
}: React.ComponentProps<typeof Link>) {
    return (
        <Link
            to={href}
            className={cn('text-primary underline underline-offset-4 hover:no-underline', className)}
            {...props}
        >
            {children}
        </Link>
    );
}
