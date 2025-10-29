type ConfirmationBoxProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type: 'success' | 'error' | 'info' | 'warning';
  actionsSlot?: React.ReactNode;
};

const colorsMap = {
  success: 'green',
  error: 'red',
  info: 'blue',
  warning: 'yellow',
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
        className={`p-4 bg-${colorsMap[type]}-50 border border-${colorsMap[type]}-200 rounded-md`}
      >
        <div className="flex">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium text-${colorsMap[type]}-800`}>
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
