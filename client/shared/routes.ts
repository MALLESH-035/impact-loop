import { z } from "zod";
import { insertUserSchema, insertTaskSchema, insertStorySchema } from "./schema";

export const api = {
  // Although the app uses client-side mock data, we define these for type consistency
  users: {
    get: {
      method: "GET",
      path: "/api/user",
      responses: {
        200: insertUserSchema,
      },
    },
    update: {
      method: "PATCH",
      path: "/api/user",
      input: insertUserSchema.partial(),
      responses: {
        200: insertUserSchema,
      },
    },
  },
};
