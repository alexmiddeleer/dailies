import ToDo from "@/ToDo";
import FakeTimers from "@sinonjs/fake-timers";

describe("ToDo", () => {
  let clock;
  beforeEach(() => {
    clock = FakeTimers.install({ now: new Date("1989-09-15T12:00:00.000Z") });
  });
  afterEach(() => {
    clock.uninstall();
  });
  it("is done if done today", () => {
    const subject = new ToDo(new Date(), "");
    expect(subject.isDone).toBeTruthy();
  });
  it("is not done if done yesterday", () => {
    const subject = new ToDo(new Date("1989-09-14T12:00:00.000Z"), "");
    expect(subject.isDone).toBeFalsy();
  });
  it("is not done if done last month", () => {
    const subject = new ToDo(new Date("1989-08-15T12:00:00.000Z"), "");
    expect(subject.isDone).toBeFalsy();
  });
});
