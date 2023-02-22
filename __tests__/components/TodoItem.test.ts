import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import TodoItem from "@/components/todo/TodoItem.vue";

describe("Todo Item Component", () => {
  it("should render", () => {
    const wrapper = mount(TodoItem, {
      props: {
        todoId: "1",
        todoName: "Simple Task",
        isCompleted: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
