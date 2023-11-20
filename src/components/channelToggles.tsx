import type { HotelChannel } from "@prisma/client";
import React from "react";

import { api } from "~/utils/api";

type ToggleProps = {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Toggle = ({ checked, disabled, label, onChange }: ToggleProps) => {
  return (
    <div>
      <span className="p-4">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

type ChannelToggleProps = HotelChannel & {
  channel: {
    name: number;
  };
};

const ChannelToggle = ({
  active,
  channelId,
  hotelId,
  channel,
}: ChannelToggleProps) => {
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

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    mutate({ hotelId, channelId, active: !active });
  };

  return (
    <Toggle
      checked={active}
      disabled={isToggling}
      label={channel.name.toString()}
      onChange={handleToggle}
    />
  );
};

const channelNames = Array.from({ length: 10 }, (_, i) => i + 1);

type ChannelTogglesProps = {
  isStarting: boolean;
  hotelId?: number;
};

export const ChannelToggles = ({
  isStarting,
  hotelId,
}: ChannelTogglesProps) => {
  const { data, isLoading } = api.hotelChannel.getHotelChannels.useQuery({
    id: hotelId ?? 1,
  });

  console.log('toggle:', { data })
  return isLoading || isStarting
    ? channelNames?.map((name) => (
        <Toggle
          key={name}
          disabled={true}
          checked={false}
          label={name.toString()}
        />
      ))
    : data?.map((channel) => (
        <ChannelToggle key={channel.channelId} {...channel} />
      ));
};
