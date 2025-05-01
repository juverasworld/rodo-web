interface NotificationItemProps {
  title: string;
  time: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  read?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  time,
  description,
  action,
  secondaryAction,
  read = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4 ${
        read ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
        <div>
          <p className="text-sm text-gray-800">{title}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      {action && (
        <div className="flex space-x-2">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-3 py-1 text-sm text-gray-600 border rounded-lg"
            >
              {secondaryAction.label}
            </button>
          )}
          <button
            onClick={action.onClick}
            className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg"
          >
            {action.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
