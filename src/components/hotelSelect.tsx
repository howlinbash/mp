import React from "react";

import { api } from "~/utils/api";

type HotelSelectProps = {
  isStarting: boolean;
  hotelId?: number;
};

export const HotelSelect = ({ isStarting, hotelId }: HotelSelectProps) => {
  const { data, isLoading } = api.hotel.getHotels.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.ui.setHotel.useMutation({
    onSuccess: () => {
      void ctx.ui.getCurrentHotel.invalidate();
    },
    onError: (e: unknown) => {
      console.error(e);
    },
  });

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    mutate({ hotelId: +e.target.value });
  };

  console.log('select:', { hotelId, data, select: data?.filter((h) => h.id === hotelId)[0]?.name ?? "" })
  return (
    <select
      name="hotelSelect"
      className="w-36 text-black"
      onChange={handleSelect}
      defaultValue={data?.filter((h) => h.id === hotelId)[0]?.name ?? ""}
    >
      {isLoading || isStarting ? (
        <option value="" />
      ) : (
        data?.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
          </option>
        ))
      )}
    </select>
  );
};
