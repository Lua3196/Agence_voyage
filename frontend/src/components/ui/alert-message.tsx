import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertMessageProps {
    type?: AlertType;
    message: string;
    className?: string;
}

const config: Record<AlertType, { icon: React.FC<{ className?: string }>; classes: string }> = {
    error: {
        icon: XCircle,
        classes: 'bg-red-50 border-red-200 text-red-700',
    },
    success: {
        icon: CheckCircle,
        classes: 'bg-green-50 border-green-200 text-green-700',
    },
    warning: {
        icon: AlertCircle,
        classes: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    },
    info: {
        icon: Info,
        classes: 'bg-blue-50 border-blue-200 text-blue-700',
    },
};

export function AlertMessage({ type = 'error', message, className = '' }: AlertMessageProps) {
    const { icon: Icon, classes } = config[type];
    return (
        <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${classes} ${className}`}>
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message}</span>
        </div>
    );
}

/** Bouton désactivé avec spinner */
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

export function LoadingButton({
    loading = false,
    loadingText = 'Chargement...',
    children,
    disabled,
    className = '',
    ...props
}: LoadingButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all
        ${loading || disabled
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-70'
                    : 'bg-primary text-white hover:opacity-90 active:opacity-80'
                }
        ${className}`}
        >
            {loading && (
                <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            {loading ? loadingText : children}
        </button>
    );
}

/** Skeleton loader pour les tableaux/listes */
export function SkeletonRow({ cols = 4 }: { cols?: number }) {
    return (
        <tr>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-4 py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </td>
            ))}
        </tr>
    );
}

/** État vide */
export function EmptyState({
    icon: Icon,
    title,
    description,
}: {
    icon: React.FC<{ className?: string }>;
    title: string;
    description?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <Icon className="mb-4 h-12 w-12 opacity-40" />
            <p className="text-base font-semibold text-gray-500">{title}</p>
            {description && <p className="mt-1 text-sm">{description}</p>}
        </div>
    );
}
