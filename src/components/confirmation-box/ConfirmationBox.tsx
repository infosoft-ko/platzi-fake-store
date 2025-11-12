type ConfirmationBoxType = 'success' | 'error' | 'info' | 'warning';

type ConfirmationBoxProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type: ConfirmationBoxType;
  actionsSlot?: React.ReactNode;
};

const bgColorMap: Record<ConfirmationBoxType, string> = {
  success: 'bg-green-50',
  error: 'bg-red-50',
  info: 'bg-blue-50',
  warning: 'bg-yellow-50',
};
const borderColorMap: Record<ConfirmationBoxType, string> = {
  success: 'border-green-200',
  error: 'border-red-200',
  info: 'border-blue-200',
  warning: 'border-yellow-200',
};
const textColorMap: Record<ConfirmationBoxType, string> = {
  success: 'text-green-800',
  error: 'text-red-800',
  info: 'text-blue-800',
  warning: 'text-yellow-800',
};

export default function ConfirmationBox({
  title,
  description,
  icon,
  type,
  actionsSlot,
}: ConfirmationBoxProps) {
  return (
    <>
      <div
        className={`p-4 ${bgColorMap[type]} border ${borderColorMap[type]} rounded-md`}
      >
        <div className="flex">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${textColorMap[type]}`}>
              {title}
            </h3>
            {description && (
              <div className="mt-2 text-sm text-gray-700">{description}</div>
            )}
          </div>
        </div>
      </div>
      {actionsSlot && (
        <div className="flex flex-col md:flex-row gap-3 mt-8">
          {actionsSlot}
        </div>
      )}
    </>
  );
}
