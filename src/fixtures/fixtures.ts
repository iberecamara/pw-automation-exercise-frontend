import { mergeTests } from "playwright/test";
import { test as logging } from "@fixtures/logging.fixtures";
import { test as pages } from "@fixtures/pages.fixtures";

export const test = mergeTests(logging, pages);
