import * as jestDOM from "@testing-library/jest-dom";
import { createSerializer } from "@emotion/jest";

expect.extend(jestDOM);
expect.addSnapshotSerializer(createSerializer());
