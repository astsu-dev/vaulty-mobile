import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { PropsWithChildren, useMemo } from "react";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "./theme";

export type BottomSheetProps = PropsWithChildren & {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

export function BottomSheet({
  children,
  bottomSheetModalRef,
}: BottomSheetProps) {
  const { colors, scale } = useTheme();

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 500,
    easing: Easing.bezierFn(0.32, 0.72, 0, 1),
  });

  return (
    <BottomSheetModal
      animationConfigs={animationConfigs}
      ref={bottomSheetModalRef}
      index={0}
      enableDynamicSizing
      backgroundStyle={{
        backgroundColor: colors.primary,
        borderTopStartRadius: scale(30),
        borderTopEndRadius: scale(30),
      }}
      handleIndicatorStyle={{
        width: scale(56),
        height: scale(8),
        backgroundColor: colors.secondary,
      }}
      handleStyle={{
        paddingTop: scale(12),
        paddingBottom: scale(20),
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          bottomSheetModalRef={bottomSheetModalRef}
          {...props}
        />
      )}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: scale(20),
          paddingBottom: scale(20),
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

function BottomSheetBackdrop({
  animatedIndex,
  style,
  bottomSheetModalRef,
}: BottomSheetBackdropProps & {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}) {
  const { colors } = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.15],
      Extrapolation.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: colors.backdrop,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle, colors.backdrop],
  );

  return (
    <Animated.View
      onTouchEndCapture={() => bottomSheetModalRef.current?.close()}
      style={containerStyle}
    ></Animated.View>
  );
}
