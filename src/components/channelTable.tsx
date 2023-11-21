import React from "react";
import {
  CHANNEL_TABLE_COL_CHANNEL,
  CHANNEL_TABLE_COL_VISIBILITY,
  TOGGLE_ID_SUFFIX,
  channelNames,
} from "~/constants";
import { Toggle } from "~/design/toggle";
import type { ToggleProps } from "~/design/toggle";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ToggleRowProps = Omit<ToggleProps, 'id'> & { label: string };

const ToggleRow = (props: ToggleRowProps) => (
  <tr className="border-grey-200 flex border-t bg-white">
    <td className="flex-1 whitespace-nowrap py-3 pl-4 pr-2 font-medium">
      <label htmlFor={props.label + TOGGLE_ID_SUFFIX}>{props.label}</label>
    </td>
    <td className="flex-end py-3 pl-2 pr-4">
      <Toggle {...props} id={props.label + TOGGLE_ID_SUFFIX} />
    </td>
  </tr>
);

type HotelWithChannel =
  RouterOutputs["hotelChannel"]["getHotelChannels"][number];

const ChannelRow = ({
  active,
  channelId,
  hotelId,
  channel,
}: HotelWithChannel) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isToggling } = api.hotelChannel.toggle.useMutation(
    {
      onSuccess: () => {
        void ctx.hotelChannel.getHotelChannels.invalidate();
      },
      onError: (e: unknown) => {
        console.error(e);
      },
    }
  );

  const handleToggle = () => {
    mutate({ hotelId, channelId, active: !active });
  };

  return (
    <ToggleRow
      isSelected={active}
      isDisabled={isToggling}
      onChange={handleToggle}
      label={channel.name}
    />
  );
};

export const ChannelTable = ({
  isStarting,
  hotelId,
}: {
  isStarting: boolean;
  hotelId?: number;
}) => {
  const { data, isLoading } = api.hotelChannel.getHotelChannels.useQuery({
    id: hotelId ?? 1,
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="border-grey-200 w-full border-separate border-spacing-0 overflow-hidden rounded-lg border text-left text-sm text-gray-500 rtl:text-right">
        <thead className="bg-gray-50 font-semibold text-gray-700">
          <tr className="flex">
            <th scope="col" className="flex-1 py-3 pl-4 pr-2">
              {CHANNEL_TABLE_COL_CHANNEL}
            </th>
            <th scope="col" className="flex-end py-3 pl-2 pr-4">
              {CHANNEL_TABLE_COL_VISIBILITY}
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {isLoading || isStarting
            ? channelNames?.map((name) => (
                <ToggleRow
                  key={name}
                  isDisabled={true}
                  isSelected={false}
                  label={name.toString()}
                />
              ))
            : data?.map((channel) => (
                <ChannelRow key={channel.channelId} {...channel} />
              ))}
        </tbody>
      </table>
    </div>
  );
};
