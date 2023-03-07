import { useBreakpoints } from "@vueuse/core";

export default () => {
  const breakpoints = useBreakpoints({
    mobileSm: "375px",
    mobileMd: "450px",
    mobile: "640px",
  });

  const onMobileSm = breakpoints.smallerOrEqual("mobileSm");
  const onMobileMd = breakpoints.smallerOrEqual("mobileMd");
  const onMobile = breakpoints.smallerOrEqual("mobile");
  const onDesktop = breakpoints.greaterOrEqual("mobile");
  const betweenMobileSmAndMd = breakpoints.between("mobileSm", "mobileMd");

  return {
    onMobileSm,
    onMobileMd,
    onMobile,
    onDesktop,
    betweenMobileSmAndMd,
  };
};
