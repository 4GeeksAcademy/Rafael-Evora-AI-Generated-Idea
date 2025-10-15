import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepClientInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Information</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Full Name</label>
        <input type="text" {...register("clientName", { required: true, minLength: 3 })} className="w-full p-2 border rounded" />
        {errors.clientName && <span className="text-red-500 text-sm">Full name is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" {...register("clientEmail", { required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ })} className="w-full p-2 border rounded" />
        {errors.clientEmail && <span className="text-red-500 text-sm">Valid email is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input type="tel" {...register("clientPhone", { required: true, minLength: 10 })} className="w-full p-2 border rounded" />
        {errors.clientPhone && <span className="text-red-500 text-sm">Valid phone number is required.</span>}
      </div>
    </div>
  );
};
