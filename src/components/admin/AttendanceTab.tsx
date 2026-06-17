'use client'

import React from 'react'
import EmployeeLiveLocationTab from './EmployeeLiveLocationTab'

interface AttendanceTabProps {
  attendanceRecords: any[]
}

export default function AttendanceTab({ attendanceRecords }: AttendanceTabProps) {
  return <EmployeeLiveLocationTab />
}
