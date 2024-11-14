"use client"

import { PuffLoader } from 'react-spinners'

import { cn } from '@/lib/utils';

interface MyLoadingProps {
  color?: string,
  size?: number,
  className?: string,
}

export const MyLoading = ({
  color = "black",
  size = 100,
  className
}: MyLoadingProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <PuffLoader size={size} color={color} />
    </div>
  )
};