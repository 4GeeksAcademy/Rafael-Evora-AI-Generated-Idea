import React from "react";

export interface Address {
  id: string;
  label: string;
  address: string;
  zip_code?: string;
  state?: string;
}

interface AddressListProps {
  addresses: Address[];
  onEditProfile: () => void;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onEditProfile,
}) => {
  return (
    <div className="mt-2">
      <span className="font-semibold text-blue-900 dark:text-blue-200">
        Addresses:
      </span>
      {addresses.length === 0 ? (
        <span className="ml-2 text-blue-900 dark:text-white">None</span>
      ) : (
        <ul className="space-y-2 mt-1 text-blue-900 dark:text-blue-300">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className="flex flex-col md:flex-row md:items-center gap-2 rounded-lg px-3 py-2"
            >
              <div className="flex flex-wrap gap-2 items-center w-full">
                <span className="font-semibold text-blue-900 dark:text-blue-200">
                  {addr.label}:
                </span>
                <span>{addr.address}</span>
                {addr.zip_code && (
                  <span className="ml-2">Zip: {addr.zip_code}</span>
                )}
                {addr.state && (
                  <span className="ml-2">State: {addr.state}</span>
                )}
                <button
                  className="ml-auto px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                  onClick={onEditProfile}
                  title="Edit address in profile"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
