import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TodoInput from "@/components/input/TodoInput.vue";

describe("Todo Input Component", () => {
  it("should render", () => {
    const wrapper = mount(TodoInput, {
      props: {
        type: "text",
        placeholder: "",
        modelValue: "",
        inputDataCy: "inputCy",
        clearDataCy: "clearCy",
        searchDataCy: "searchCy",
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
