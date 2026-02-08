'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, ClipboardList, CheckCircle2, Clock } from 'lucide-react'

export function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">หน้าแรก</h1>
          <p className="text-muted-foreground">ยินดีต้อนรับสู่ระบบจัดการงานส่งรถเช่า</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">วันนี้</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">8</h3>
            <p className="text-sm text-muted-foreground">งานทั้งหมด</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning-foreground" />
              </div>
              <Badge variant="secondary">รอดำเนินการ</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">5</h3>
            <p className="text-sm text-muted-foreground">งานค้างอยู่</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">กำลังส่ง</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">2</h3>
            <p className="text-sm text-muted-foreground">กำลังดำเนินการ</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <Badge variant="secondary">เสร็จสิ้น</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">1</h3>
            <p className="text-sm text-muted-foreground">สำเร็จแล้ว</p>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Car className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">ระบบจัดการงานส่งรถเช่า</h2>
            <p className="text-muted-foreground mb-6">
              ระบบช่วยให้พนักงานส่งรถสามารถบันทึกข้อมูลการส่งรถ 
              ตรวจสภาพรถ เซ็นสัญญา รับเงิน และบันทึกค่าใช้จ่ายได้อย่างมีประสิทธิภาพ
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">✓ ตรวจสภาพรถแบบละเอียด</p>
                <p className="text-xs text-muted-foreground">บันทึกสภาพรถและถ่ายรูป</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">✓ ลายเซ็นอิเล็กทรอนิกส์</p>
                <p className="text-xs text-muted-foreground">เซ็นสัญญาผ่านระบบ</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">✓ บันทึกการรับเงิน</p>
                <p className="text-xs text-muted-foreground">พร้อมอัพโหลดสลิป</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">✓ จัดการค่าใช้จ่าย</p>
                <p className="text-xs text-muted-foreground">บันทึกค่าเดินทางและใบเสร็จ</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
