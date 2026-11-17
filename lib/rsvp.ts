export type RsvpState =
  | { status: "idle" }
  | { status: "success"; attending: "yes" | "no" }
  | { status: "error"; errors: { name?: boolean; attending?: boolean; form?: boolean } };

export const initialRsvpState: RsvpState = { status: "idle" };
