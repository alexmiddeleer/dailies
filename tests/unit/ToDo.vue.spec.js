import ToDo from "@/components/ToDo.vue";
import ToDoClass from "@/ToDo";
import FakeTimers from "@sinonjs/fake-timers";
import { mount } from "@vue/test-utils";
import Vue from "vue";

describe("ToDo component", () => {
  let clock;
  beforeEach(() => {
    clock = FakeTimers.install({ now: new Date("1989-09-15T12:00:00.000Z") });
  });
  afterEach(() => {
    clock.uninstall();
  });
  it("renders", async () => {
    const wrapper = mount(ToDo, {
      propsData: {
        todo: new ToDoClass(new Date(), "Hello world")
      }
    });
    await wrapper.find('input[type="checkbox"]').trigger("input");

    expect(wrapper.text()).toContain("Hello world");
    expect(wrapper.find("input:checked").exists()).toBeTruthy();
  });
  it("is not checked if todo is old", async () => {
    const wrapper = mount(ToDo, {
      propsData: {
        todo: new ToDoClass(new Date(0), "")
      }
    });
    await wrapper.find('input[type="checkbox"]').trigger("input");

    expect(wrapper.find("input:checked").exists()).toBeFalsy();
  });
  it("updates at midnight", async () => {
    const wrapper = mount(ToDo, {
      propsData: {
        todo: new ToDoClass(new Date(), "Hello world")
      }
    });

    expect(wrapper.find("input:checked").exists()).toBeTruthy();
    clock.tick(2 * 1000 * 60 * 60 * 24);
    await Vue.nextTick();
    expect(wrapper.find("input:checked").exists()).toBeFalsy();
  });
});
