import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { getLiveUserCount } from "@/lib/supabase";

/**
 * getLiveUserCount is the only pure function in src/lib/supabase.ts.
 * Everything else is a thin wrapper over the Supabase client and is
 * covered by E2E rather than mocked here -- see TESTING.md.
 *
 * Note what these tests document: the counter is synthetic. It has never
 * read the database (risk R-19). Testing it pins that behaviour down so a
 * future change to a real query is a deliberate, visible decision.
 */
describe("getLiveUserCount", () => {
  const BASE = 6086;
  const MAX_WOBBLE = 8;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * Dates are built with the local-time constructor on purpose. The seed uses
   * getFullYear/getMonth/getDate, which are local, so a UTC literal would make
   * these tests pass or fail depending on the machine's timezone.
   * Month is 0-indexed: 8 = September.
   */
  const localNoon = (day: number) => new Date(2026, 8, day, 12, 0, 0);

  test("returns the same value throughout a single local day", () => {
    // Arrange
    vi.setSystemTime(new Date(2026, 8, 6, 9, 0, 0));

    // Act
    const morning = getLiveUserCount();
    vi.setSystemTime(new Date(2026, 8, 6, 23, 30, 0));
    const nearMidnight = getLiveUserCount();

    // Assert -- the wobble is seeded by the calendar date, not the clock
    expect(nearMidnight).toBe(morning);
  });

  test("rolls over at LOCAL midnight, not UTC midnight", () => {
    // Documents a real consequence rather than hiding it: the seed reads
    // local date parts, so the number changes at each viewer's own midnight.
    // Two people in different timezones can see different counts at the same
    // instant. Harmless for a cosmetic counter -- but it must not be mistaken
    // for a real metric. See R-19.
    vi.setSystemTime(new Date(2026, 8, 6, 23, 59, 0));
    const before = getLiveUserCount();

    vi.setSystemTime(new Date(2026, 8, 7, 0, 1, 0));
    const after = getLiveUserCount();

    expect(after).not.toBe(before);
  });

  test("stays within the documented wobble of the base count", () => {
    vi.setSystemTime(localNoon(6));

    const count = getLiveUserCount();

    expect(count).toBeGreaterThanOrEqual(BASE - MAX_WOBBLE);
    expect(count).toBeLessThanOrEqual(BASE + MAX_WOBBLE);
  });

  test("stays within the wobble across a long span of dates", () => {
    const seen = new Set<number>();

    for (let day = 1; day <= 28; day++) {
      vi.setSystemTime(localNoon(day));
      const count = getLiveUserCount();
      expect(Math.abs(count - BASE)).toBeLessThanOrEqual(MAX_WOBBLE);
      seen.add(count);
    }

    // It should actually vary, otherwise the "live" effect is a no-op.
    expect(seen.size).toBeGreaterThan(1);
  });

  test("always returns a whole number", () => {
    vi.setSystemTime(localNoon(6));

    expect(Number.isInteger(getLiveUserCount())).toBe(true);
  });
});
