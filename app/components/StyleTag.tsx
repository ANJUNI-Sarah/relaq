interface StyleTagProps {
  icon?: string;
  label: string;
  className?: string;
}

export function StyleTag({ icon, label, className = "" }: StyleTagProps) {
  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-lg bg-pink-100 text-gray-700 ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </div>
  );
} 