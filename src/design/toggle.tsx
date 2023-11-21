export type ToggleProps = {
  id: string;
  isSelected: boolean;
  isDisabled: boolean;
  onChange?: () => void;
};

export const Toggle = ({ id, isSelected, isDisabled, onChange }: ToggleProps) => (
  <div className="relative inline-flex cursor-pointer items-center">
    <input
      id={id}
      type="checkbox"
      className="peer sr-only outline-red-700"
      checked={isSelected}
      onChange={onChange}
      disabled={isDisabled}
    />
    <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full" />
  </div>
);
