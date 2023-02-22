import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TodoInput from "@/components/todo/TodoInput.vue";

describe("Todo Input Component", () => {
  it("should render", () => {
    const wrapper = mount(TodoInput, {
      props: {
        type: "text",
        placeholder: "",
        modelValue: "",
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
