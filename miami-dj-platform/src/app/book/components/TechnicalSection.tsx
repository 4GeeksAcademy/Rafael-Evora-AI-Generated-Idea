import React from "react";

interface TechnicalSectionProps {
  event_name: string;
  lighting: "yes" | "no" | undefined;
  setLighting: (val: "yes" | "no" | undefined) => void;
  audio: "direct" | "indirect" | "combination" | undefined;
  setAudio: (val: "direct" | "indirect" | "combination" | undefined) => void;
}

export const TechnicalSection: React.FC<TechnicalSectionProps> = ({
  event_name,
  lighting,
  setLighting,
  audio,
  setAudio,
}) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-6 text-blue-700">
      Technical Preferences{event_name ? ` for ${event_name}` : ""}
    </h2>
    <div className="mb-6">
      <div className="font-bold text-blue-700 mb-2">Lighting & Smoke Show</div>
      <div className="space-y-4">
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="lighting"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={lighting === "yes"}
            onChange={() => setLighting("yes")}
          />
          <span className="font-bold mr-2">Yes</span>
          <span className="text-gray-500">
            Includes lighting effects and smoke show for a dramatic atmosphere.
          </span>
        </label>
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="lighting"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={lighting === "no"}
            onChange={() => setLighting("no")}
          />
          <span className="font-bold mr-2">No</span>
          <span className="text-gray-500">
            No additional lighting or smoke effects, standard setup only.
          </span>
        </label>
      </div>
    </div>
    <div>
      <div className="font-bold text-blue-700 mb-2">Audio Setup</div>
      <div className="space-y-4">
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="audio"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={audio === "direct"}
            onChange={() => setAudio("direct")}
          />
          <span className="font-bold mr-2">Direct/Party</span>
          <span className="text-gray-500">
            Loud, energetic, best for dancing and parties.
          </span>
        </label>
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="audio"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={audio === "indirect"}
            onChange={() => setAudio("indirect")}
          />
          <span className="font-bold mr-2">Indirect/Ambient</span>
          <span className="text-gray-500">
            Soft, background music, ideal for mingling.
          </span>
        </label>
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="audio"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={audio === "combination"}
            onChange={() => setAudio("combination")}
          />
          <span className="font-bold mr-2">Combination</span>
          <span className="text-gray-500">
            Mix of party and ambient, flexible for all events.
          </span>
        </label>
        <label className="flex items-center bg-blue-50/80 rounded-xl p-4 shadow-md cursor-pointer">
          <input
            type="radio"
            name="audio"
            className="form-radio h-5 w-5 text-blue-600 mr-3"
            checked={audio === undefined}
            onChange={() => setAudio(undefined)}
          />
          <span className="font-bold mr-2">No Audio</span>
          <span className="text-gray-500">
            No audio setup required for this event.
          </span>
        </label>
      </div>
    </div>
  </div>
);
