import type { Hotel } from "@prisma/client";
import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "~/server/api/root";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { Chevron } from "~/design/chevron";
import { api } from "~/utils/api";
import { HOTEL_SELECT_ID, HOTEL_SELECT_LABEL } from "~/constants";

export const HotelSelect = ({ hotelId }: { hotelId?: number }) => {
  const { data, isLoading } = api.hotel.getHotels.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.ui.setHotel.useMutation({
    onSuccess: () => {
      void ctx.ui.getCurrentHotel.invalidate();
    },
    onError: (e: TRPCClientErrorLike<AppRouter>) => {
      console.error(e);
    },
  });

  const handleSelect = (id: number | string) => {
    mutate({ hotelId: +id });
  };

  return (
    <div className="my-5 flex flex-col">
      <Label className="mb-0.5 text-sm font-semibold" htmlFor={HOTEL_SELECT_ID}>
        {HOTEL_SELECT_LABEL}
      </Label>
      <Select
        placeholder=""
        id={HOTEL_SELECT_ID}
        aria-label={HOTEL_SELECT_ID}
        onSelectionChange={handleSelect}
        selectedKey={hotelId}
        className="block max-w-[275px] rounded-lg border border-gray-300 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        {isLoading ? (
          <div className="flex justify-between pr-2">
            <div className="px-3 py-2 text-base text-white">...</div>
            <Chevron />
          </div>
        ) : (
          <>
            <Button className="w-full outline-gray-200">
              <div className="flex justify-between pr-2">
                <SelectValue className="text-base" />
                <Chevron />
              </div>
            </Button>
            <Popover className="z-10 w-[275px] rounded-lg border border-gray-300 bg-white drop-shadow-lg">
              <ListBox items={data}>
                {(hotel: Hotel) => (
                  <ListBoxItem className="outline-gray-200">
                    <div className="px-3 py-2 hover:bg-gray-200">
                      {hotel.name}
                    </div>
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </>
        )}
      </Select>
    </div>
  );
};
