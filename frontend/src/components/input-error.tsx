export default function InputError({ message, className = '' }: { message?: string; className?: string }) {
    if (!message) return null;
    return <p className={`text-sm text-destructive ${className}`}>{message}</p>;
}
