import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description: string
  icon?: React.ReactNode
  className?: string
}

export default function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div className={cn('py-20 text-center col-span-full', className)}>
      {icon && (
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="font-display font-bold text-lg text-gray-900">{title}</h3>
      )}
      <p className="mt-2 text-gray-500 text-md">{description}</p>
    </div>
  )
}
