import { useBreakpoints } from "@vueuse/core";

export default () => {
  const breakpoints = useBreakpoints({
    mobile: "640px",
  });

  const onMobile = breakpoints.smaller("mobile");
  const onDesktop = breakpoints.greaterOrEqual("mobile");

  return {
    onMobile: onMobile,
    onDesktop: onDesktop,
  };
};
