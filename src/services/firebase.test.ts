import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));
import {
  registerWithEmail,
  loginWithEmail,
  logout,
  onUserStateChanged,
} from "./firebase";
import * as auth from "firebase/auth";

describe("firebase.ts service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registerWithEmail calls createUserWithEmailAndPassword", () => {
    registerWithEmail("foo@example.com", "pass123");
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "foo@example.com",
      "pass123"
    );
  });

  it("loginWithEmail calls signInWithEmailAndPassword", () => {
    loginWithEmail("bar@example.com", "qwerty");
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "bar@example.com",
      "qwerty"
    );
  });

  it("logout calls signOut", () => {
    logout();
    expect(auth.signOut).toHaveBeenCalledWith(expect.anything());
  });

  it("onUserStateChanged calls onAuthStateChanged", () => {
    const cb = vi.fn();
    onUserStateChanged(cb);
    expect(auth.onAuthStateChanged).toHaveBeenCalledWith(
      expect.anything(),
      cb
    );
  });
});
