import React from "react";

import { useFormContext } from "react-hook-form";

export const FormStepClientInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  const { watch } = useFormContext();
  const nameFilled = !!watch("clientName");
  const emailFilled = !!watch("clientEmail");
  const phoneFilled = !!watch("clientPhone");
  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-4 text-neon-green drop-shadow-xl animate-pulse dark:text-green-400">Client Information</h2>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Full Name</label>
        <input type="text" {...register("clientName", { required: true, minLength: 3 })} className={`w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400 transition-all duration-300 ${nameFilled ? 'bg-neon-green/30' : ''}`} />
        {errors.clientName && <span className="text-red-500 text-sm">Full name is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Email</label>
        <input type="email" {...register("clientEmail", { required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ })} className={`w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400 transition-all duration-300 ${emailFilled ? 'bg-neon-green/30' : ''}`} />
        {errors.clientEmail && <span className="text-red-500 text-sm">Valid email is required.</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold text-white dark:text-green-400">Phone Number</label>
        <input type="tel" {...register("clientPhone", { required: true, minLength: 10 })} className={`w-full p-3 mb-2 border-none rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 shadow focus:ring-4 focus:ring-neon-green dark:focus:ring-green-400 transition-all duration-300 ${phoneFilled ? 'bg-neon-green/30' : ''}`} />
        {errors.clientPhone && <span className="text-red-500 text-sm">Valid phone number is required.</span>}
      </div>
    </div>
  );
};
