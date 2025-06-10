import { describe, it, expect } from "vitest";
import {
  homeRoute,
  loginRoute,
  registerRoute,
  cartRoute,
  notFoundRoute,
} from "./routes";

describe("routes.tsx — пути маршрутов", () => {
  it("homeRoute должен быть по пути '/'", () => {
    expect(homeRoute.path).toBe("/");      // остаётся "/"
  });

  it("loginRoute должен быть по пути 'login'", () => {
    expect(loginRoute.path).toBe("login"); // без слэша
  });

  it("registerRoute должен быть по пути 'register'", () => {
    expect(registerRoute.path).toBe("register");
  });

  it("cartRoute должен быть по пути 'cart'", () => {
    expect(cartRoute.path).toBe("cart");
  });

  it("notFoundRoute должен ловить всё ('*')", () => {
    expect(notFoundRoute.path).toBe("*");
  });
});
