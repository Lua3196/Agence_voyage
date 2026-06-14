import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export default function PasswordInput({
    className,
    ...props
}: React.ComponentProps<typeof Input>) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <Input
                type={show ? 'text' : 'password'}
                className={cn('pr-10', className)}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                onClick={() => setShow(!show)}
                tabIndex={-1}
            >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
        </div>
    );
}
