import imgSample from "../assets/pexels-oziel-gómez-849835-cropped.jpg";
import { splitImage12 } from "./imageUtils";

test("Should return array with 12 image elements", () => {
  expect(splitImage12(imgSample).length).toBe(12);
});
