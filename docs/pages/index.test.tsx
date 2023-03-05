import { render } from "@/components/testUtils";
import Index from "./index.page";

describe("Our index page", () => {
  test("Renders without crashing", () => {
    render(<Index />);
  });
});
