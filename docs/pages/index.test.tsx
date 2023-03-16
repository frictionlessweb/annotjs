import { render, act } from "@/components/testUtils";
import Index from "./index.page";

describe("Our index page", () => {
  test("Renders without crashing", async () => {
    await act(async () => {
      render(<Index />);
    });
  });
});
