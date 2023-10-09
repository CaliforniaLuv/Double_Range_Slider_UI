import type { Meta, StoryObj } from "@storybook/react";
import { MultipleRangeInput } from "./MultipleRangeInput";
import { PRICE_RANGE } from "./constant";

const meta = {
  title: "ui/trade/MultipleRangeInput",
  component: MultipleRangeInput,
  parameters: {},
} satisfies Meta<typeof MultipleRangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: "MultipleRangeInput",
  args: {
    rangeInfoList: PRICE_RANGE,
  },
};
