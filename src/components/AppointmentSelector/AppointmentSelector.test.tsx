import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import AppointmentSelector, {
  AppointmentSelectorProps,
} from "./AppointmentSelector";
import { act } from "react-dom/test-utils";
import { Availability } from "./types";
import { getAppointmentKey } from "./utils";
const { add, format } = require("date-fns");

describe("<AppointmentSelector />", () => {
  it("should match the snapshot", async () => {
    const props = makeProps();
    const { container } = render(<AppointmentSelector {...props} />, {
      wrapper: MemoryRouter,
    });
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when loading", async () => {
    const props = makeProps();
    props.isFetching = true;
    const { container } = render(<AppointmentSelector {...props} />, {
      wrapper: MemoryRouter,
    });
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with no availability", async () => {
    const props = makeProps();
    props.appointments = [];
    const { container } = render(<AppointmentSelector {...props} />, {
      wrapper: MemoryRouter,
    });
    expect(container).toMatchSnapshot();
  });

  it("should call fetchAvailability on load", async () => {
    const props = makeProps();
    await act(async () => {
      render(<AppointmentSelector {...props} />);
    });
    expect(props.fetchAvailability).toHaveBeenCalledTimes(1);
  });

  it("should call fetchAvailability when user enters a different date", async () => {
    const todaysDate = new Date(Date.now());
    todaysDate.setHours(0, 0, 0, 0);
    const props = makeProps({ now: todaysDate });
    const { container, getByTestId } = render(
      <AppointmentSelector {...props} />
    );
    const keyBoardDatePicker = getByTestId("keyboardDatePicker");
    expect(keyBoardDatePicker).toBeTruthy();
    const input = container.querySelector("#date-picker-dialog");
    if (!input) {
      throw new Error("could not find input");
    }
    const convertToString = add(todaysDate, { days: 1 });
    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: format(new Date(add(todaysDate, { days: 1 })), "dd/MM/yyyy"),
        },
      });
    });

    expect(props.fetchAvailability).toHaveBeenCalledTimes(2);
    const calls = (props.fetchAvailability as jest.Mock<any, any>).mock.calls;
    expect(calls).toEqual([
      [
        {
          start: new Date(todaysDate),
          end: new Date(todaysDate),
          locationId: "selectedLocationId",
          serviceId: "selectedServiceId",
        },
      ],
      [
        {
          start: new Date(add(todaysDate, { days: 1 })),
          end: new Date(add(todaysDate, { days: 1 })),
          locationId: "selectedLocationId",
          serviceId: "selectedServiceId",
        },
      ],
    ]);
  });

  it("should call setAppointment when an appointment is selected", async () => {
    const props = makeProps();
    let renderObj = null;
    await act(async () => {
      const { container, getByTestId } = render(
        <AppointmentSelector {...props} />
      );
      const selectAv = props!.appointments[0];
      const key = getAppointmentKey(selectAv);
      await act(async () => {
        const select = await waitForElement(() =>
          getByTestId("appointmentSlot/appointment-select")
        );

        fireEvent.click(select, {
          target: { value: key },
        });
      });
      expect(props.setAppointment).toBeCalledWith(selectAv);
    });
  });
});

function makeProps(
  v?: Partial<AppointmentSelectorProps>
): AppointmentSelectorProps {
  return {
    now: v?.now ?? new Date("2020-12-05T12:00:00"),
    appointments: [
      makeAvailability(11),
      makeAvailability(12),
      makeAvailability(13),
    ],
    selectedAppointment: makeAvailability(12),
    isFetching: false,
    selectedServiceId: "selectedServiceId",
    selectedLocationId: "selectedLocationId",
    fetchAvailability: jest.fn(),
    setAppointment: jest.fn(),
  };
}

function makeAvailability(hour: number): Availability {
  return {
    startTime: new Date(`2020-12-05T${hour}:00:00`),
    endTime: new Date(`2020-12-05T${hour}:30:00`),
    resourceId: `123-${hour}`,
  };
}
