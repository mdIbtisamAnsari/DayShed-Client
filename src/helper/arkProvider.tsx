import React, { useMemo, useEffect, ReactNode } from 'react';
import { Text, View } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import { useSharedValue, withTiming } from 'react-native-reanimated';

type ArcProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  arcSweepAngle?: number;
  rotation?: number;
  colors?: string[];
  backgroundColor?: string;
  children?: ReactNode;
  className?: string;
};

const ArcProgress = ({
  size = 200,
  strokeWidth = 20,
  progress = 0,
  arcSweepAngle = 270,
  rotation = 135,
  colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  backgroundColor = '#E9ECEF',
  children,
  className
}: ArcProgressProps) => {
  const radius = size / 2 - strokeWidth / 2;
  const center = size / 2;

  // Animate the Path's `end` trim (0 → 1)
  const animatedEnd = useSharedValue(progress);

  useEffect(() => {
    animatedEnd.value = withTiming(progress, { duration: 600 });
  }, [progress]);

  // Arc geometry (shared by track + progress)
  const arcPath = useMemo(() => {
    const p = Skia.Path.Make();
    p.addArc(
      { x: center - radius, y: center - radius, width: radius * 2, height: radius * 2 },
      rotation,
      arcSweepAngle
    );
    return p;
  }, [radius, center, rotation, arcSweepAngle]);

  return (
    <View className={className} style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
      <Canvas style={{ width: size, height: size }}>
        {/* Track */}
        <Path
          path={arcPath}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          color={backgroundColor}
        />
        {/* Progress with sweep gradient */}
        <Path
          path={arcPath}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          end={animatedEnd}
        >
          <SweepGradient
            c={vec(center, center)}
            colors={colors}
            start={0}
            end={360}
          />
        </Path>
      </Canvas>
      <View style={{ position: 'absolute' }}>
        {children ?? <Text style={{ fontSize: 32, fontWeight: '700' }}>{Math.round(progress * 100)}%</Text>}
      </View>
    </View>
  );
};

export default ArcProgress;   