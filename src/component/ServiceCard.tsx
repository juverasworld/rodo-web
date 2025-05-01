interface ServiceCardProps {
  title: string;
  duration: string;
  price: string;
  bookings: number;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  duration,
  price,
  bookings,
  onEdit,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-lg mr-4"></div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">
              {duration} @ {price}
            </p>
            <p className="text-sm text-gray-500">Total bookings: {bookings}</p>
          </div>
        </div>
        <button onClick={onEdit} className="text-pink-500 text-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
