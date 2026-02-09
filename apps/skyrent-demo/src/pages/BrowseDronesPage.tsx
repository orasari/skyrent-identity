import type { Drone } from '../types/drone';

interface BrowseDronesPageProps {
  drones: Drone[];
  selectedDroneId: string | null;
  onSelectDrone: (id: string) => void;
  onStartVerification: () => void;
}

const formatPrice = (pricePerHour: number) => `$${pricePerHour}/hr`;

export function BrowseDronesPage({
  drones,
  selectedDroneId,
  onSelectDrone,
  onStartVerification,
}: BrowseDronesPageProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Step 1 of 3
          </p>
          <h2 className="text-2xl font-semibold">Browse Drones</h2>
          <p className="text-gray-600">Choose your rental drone.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {drones.map((drone) => {
          const isSelected = drone.id === selectedDroneId;
          return (
            <div
              key={drone.id}
              className={`cursor-pointer rounded-xl border p-5 shadow-sm transition ${
                isSelected
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{drone.name}</h3>
                  <p className="text-sm text-gray-600">{drone.description}</p>
                </div>
                <span className="text-2xl">{drone.icon}</span>
              </div>
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <div>Range: {drone.rangeMiles} miles</div>
                <div>Top speed: {drone.maxSpeedMph} mph</div>
                <div className="font-semibold text-gray-900">{formatPrice(drone.pricePerHour)}</div>
              </div>
              <button
                type="button"
                onClick={() => onSelectDrone(drone.id)}
                className={`mt-4 w-full rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  isSelected
                    ? 'border-emerald-300 bg-emerald-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isSelected ? 'Selected' : 'Select Drone'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onStartVerification}
          disabled={!selectedDroneId}
          className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
            selectedDroneId
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          Continue to Verification
        </button>
      </div>
    </div>
  );
}
