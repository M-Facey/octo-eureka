import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TodoButton from "@/components/input/TodoButton.vue";

describe("Todo Button Component", () => {
  it("should render", () => {
    const wrapper = mount(TodoButton, {
      props: {
        buttonLabel: "Button",
        buttonSize: "lg",
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
