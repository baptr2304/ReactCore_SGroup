interface ErrorMessageProps {
  id: string;
  children?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ id, children }) => {
  if (!children) return null;
  return (
    <div id={id} className="text-sm text-red-500">
      {children}
    </div>
  );
};

export default ErrorMessage;
