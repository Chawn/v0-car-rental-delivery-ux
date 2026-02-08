'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  CheckCircle2,
  MapPin,
  FileText,
  Gauge,
  Fuel,
  Check,
  Navigation,
} from 'lucide-react'
import type { DeliveryViewProps } from './types'
import { EXPENSE_TYPES } from './types'

export function DesktopView({
  startMileage,
  startFuelLevel,
  vehicleCondition,
  damages,
  vehiclePhotos,
  contractRead,
  customerSignature,
  driverSignature,
  paymentAmount,
  paymentMethod,
  paymentSlip,
  expenses,
}: DeliveryViewProps) {
  const vehicleConditionLabels: Record<string, string> = {
    windshieldWiper: 'แผงปัดน้ำ',
    sideMirror: 'กระจกมองข้าง',
    brakes: 'มูลเบรก',
    steeringWheel: 'พวงมาลัย',
    remoteStart: 'รีโมทสตาร์ท',
    carJack: 'แม่แรงรถยนต์',
    spareTire: 'ยางอะไหล่',
    headlights: 'ไฟหน้า',
    taillights: 'ไฟท้าย',
    turnSignals: 'ไฟเลี้ยว',
    engineOil: 'น้ำมันเครื่อง',
    brakeFluid: 'น้ำมันเบรก',
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">งานส่งรถ #DT20260203001</h1>
              <p className="text-sm text-muted-foreground mt-1">Toyota Camry - กก 1234</p>
            </div>
            <Badge variant="secondary" className="text-base px-4 py-2 font-medium">
              Desktop View (Read-Only)
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Grid - 2 columns */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Step 1: ตรวจสภาพรถ */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <h2 className="text-xl font-semibold">ตรวจสภาพรถ</h2>
            </div>

            <div className="space-y-6">
              {/* เลขไมล์และน้ำมัน */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">เลขไมล์ปัจจุบัน</div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base font-semibold">{startMileage || '-'} กม.</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">ระดับน้ำมัน</div>
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base font-semibold">{startFuelLevel || '-'}/8</span>
                  </div>
                </div>
              </div>

              {/* Damage List */}
              {damages.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-3">รายการความเสียหาย ({damages.length})</div>
                  <div className="space-y-2">
                    {damages.map((damage, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg text-sm"
                      >
                        <span className="font-medium">{damage.location}</span>
                        <span className="text-warning-foreground">{damage.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {damages.length === 0 && (
                <div className="p-4 bg-success/10 border border-success/30 rounded-lg text-center">
                  <Check className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="text-sm font-medium text-success-foreground">
                    ไม่พบความเสียหาย
                  </p>
                </div>
              )}

              {/* Checklist */}
              <div>
                <div className="text-sm font-medium mb-3">Checklist อุปกรณ์</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(vehicleCondition).map(([key, checked]) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-2 rounded border ${
                        checked
                          ? 'border-success bg-success/10'
                          : 'border-border bg-muted/20'
                      }`}
                    >
                      <span className="text-xs">{vehicleConditionLabels[key]}</span>
                      {checked ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <span className="text-xs text-muted-foreground">ไม่ได้ตรวจ</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* รูปถ่าย */}
              {vehiclePhotos.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-3">รูปภาพรถ ({vehiclePhotos.length})</div>
                  <div className="grid grid-cols-4 gap-2">
                    {vehiclePhotos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={photo || '/placeholder.svg'}
                          alt={`รูป ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Step 2: เดินทาง */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <h2 className="text-xl font-semibold">ข้อมูลการเดินทาง</h2>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5973639343444!2d100.56070431483014!3d13.744677090349436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed269d3d0b9%3A0x7a8e9b7e1f5c8c5c!2z4LiW4LiZ4LiZ4Liq4Li44LiC4Li44Lih4Lin4Li04LiXIOC4geC4o-C4uOC4h-C5gOC4l-C4nuC4oeC4q-C4suC4meC4hOC4og!5e0!3m2!1sen!2sth!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">123 ถนนสุขุมวิท กรุงเทพฯ</p>
                  <p className="text-xs text-muted-foreground">12.5 กม. | 25 นาที</p>
                </div>
                <Navigation className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">เวลานัดหมาย</span>
                  <span className="font-medium">14:00 น.</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">ชื่อลูกค้า</span>
                  <span className="font-medium">คุณสมชาย ใจดี</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">เบอร์ติดต่อ</span>
                  <span className="font-medium">082-xxx-xxxx</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 5: ค่าใช้จ่าย */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                5
              </div>
              <h2 className="text-xl font-semibold">ค่าใช้จ่ายในการเดินทาง</h2>
            </div>

            {expenses.length > 0 ? (
              <div className="space-y-3">
                {expenses.map((expense, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {EXPENSE_TYPES.find((t) => t.value === expense.type)?.label}
                      </Badge>
                      {expense.description && (
                        <span className="text-sm text-muted-foreground">
                          {expense.description}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold">{expense.amount} บาท</span>
                  </div>
                ))}
                <div className="p-4 bg-primary/5 border-primary/20 border rounded-lg">
                  <div className="flex justify-between font-semibold text-base">
                    <span>รวมค่าใช้จ่ายทั้งหมด</span>
                    <span className="text-primary">
                      {expenses.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()} บาท
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-muted/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">ยังไม่มีรายการค่าใช้จ่าย</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Step 3: เซ็นสัญญา */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <h2 className="text-xl font-semibold">สัญญาเช่ารถ</h2>
            </div>

            <div className="space-y-4">
              {/* สรุปค่าใช้จ่าย */}
              <div className="p-4 bg-primary/5 border-primary/20 border rounded-lg">
                <h3 className="text-sm font-semibold mb-3 text-center">สรุปค่าใช้จ่าย</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span>ค่าเช่ารถ (7 วัน)</span>
                    <span className="font-medium">15,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span>ค่าส่งรถ</span>
                    <span className="font-medium">500 บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span>เงินประกัน</span>
                    <span className="font-medium">10,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-2 bg-primary/10 px-2 rounded mt-2">
                    <span className="font-bold">ยอดรวมทั้งสิ้น</span>
                    <span className="font-bold text-primary">25,500 บาท</span>
                  </div>
                </div>
              </div>

              {/* อัตราค่าปรับ */}
              <div className="p-4 bg-muted/20 rounded-lg">
                <h3 className="text-sm font-semibold mb-3">อัตราค่าปรับ</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(A) รอยขูดข่วน</span>
                    <span className="font-medium">500-1,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(B) รอยกระตุก-ตอก</span>
                    <span className="font-medium">700-3,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(C) รอยบุบเล็กน้อย</span>
                    <span className="font-medium">500 บาท</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(D) รอยบุบมาก</span>
                    <span className="font-medium">1,000-3,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(E) รอยริ้ว</span>
                    <span className="font-medium">700-3,000 บาท</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">(F) อื่นๆ</span>
                    <span className="font-medium">ตามเกณฑ์</span>
                  </div>
                </div>
              </div>

              {/* สัญญา */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-semibold">สัญญาเช่ารถยนต์</h3>
                </div>
                <ScrollArea className="h-[300px] w-full rounded-lg border border-border p-4 bg-muted/20">
                  <div className="text-xs leading-relaxed space-y-3">
                    <p className="font-semibold">
                      สัญญาเช่ารถยนต์ฉบับนี้ทำขึ้นระหว่าง บริษัท ABC เช่ารถ จำกัด ("ผู้ให้เช่า") 
                      และ คุณสมชาย ใจดี ("ผู้เช่า") ตกลงทำสัญญาเช่ารถยนต์ดังต่อไปนี้
                    </p>
                    
                    <div>
                      <p className="font-semibold">ข้อ 1: ข้อมูลรถยนต์</p>
                      <p>ผู้ให้เช่าตกลงให้เช่า และผู้เช่าตกลงเช่ารถยนต์ยี่ห้อ Toyota รุ่น Camry 
                      หมายเลขทะเบียน กก-1234 กรุงเทพมหานคร</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 2: ระยะเวลาการเช่า</p>
                      <p>ตั้งแต่วันที่ 3 กุมภาพันธ์ 2026 ถึงวันที่ 10 กุมภาพันธ์ 2026 รวม 7 วัน</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 3: ค่าเช่าและค่าใช้จ่าย</p>
                      <p>• ค่าเช่ารถ: 15,000 บาท<br />
                      • ค่าส่งรถ: 500 บาท<br />
                      • เงินประกัน: 10,000 บาท<br />
                      • ยอดรวม: 25,500 บาท</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 4: เงินประกัน</p>
                      <p>ผู้เช่าต้องวางเงินประกัน 10,000 บาท ซึ่งจะคืนให้เมื่อคืนรถในสภาพสมบูรณ์</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 5: ความรับผิดชอบของผู้เช่า</p>
                      <p>• ผู้เช่าต้องรับผิดชอบในความเสียหายที่เกิดขึ้นกับรถ<br />
                      • ห้ามนำรถไปใช้ในทางที่ผิดกฎหมาย<br />
                      • ห้ามให้บุคคลอื่นขับรถโดยไม่ได้รับอนุญาต</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 6: อัตราค่าปรับ</p>
                      <p>• รอยขูดข่วน (A): 500-1,000 บาท<br />
                      • รอยกระตุก-ตอก (B): 700-3,000 บาท<br />
                      • รอยบุบเล็กน้อย (C): 500 บาท<br />
                      • รอยบุบมาก (D): 1,000-3,000 บาท</p>
                    </div>

                    <div>
                      <p className="font-semibold">ข้อ 7: การคืนรถ</p>
                      <p>ผู้เช่าต้องคืนรถในสภาพเดียวกับตอนรับรถ หากคืนล่าช้ามีค่าปรับ 500 บาท/ชั่วโมง</p>
                    </div>

                    <p className="pt-3 border-t border-border/50 text-center">
                      ผู้เช่าและผู้ให้เช่าได้อ่านและเข้าใจข้อตกลงทั้งหมดแล้ว
                    </p>
                  </div>
                </ScrollArea>
              </div>

              {/* สถานะสัญญา */}
              <div className="space-y-2">
                <div className={`flex items-center gap-2 p-3 rounded-lg border ${
                  contractRead ? 'border-success bg-success/10' : 'border-border bg-muted/20'
                }`}>
                  {contractRead ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <span className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">
                    {contractRead ? '✓ อ่านและเข้าใจสัญญาแล้ว' : 'ยังไม่ได้อ่านสัญญา'}
                  </span>
                </div>

                <div className={`p-3 rounded-lg border ${
                  customerSignature ? 'border-success bg-success/10' : 'border-border bg-muted/20'
                }`}>
                  <div className="text-xs font-medium text-muted-foreground mb-1">ลายเซ็นลูกค้า</div>
                  <div className="text-sm font-semibold">
                    {customerSignature ? '✓ ลูกค้าเซ็นชื่อแล้ว' : 'รอลายเซ็น'}
                  </div>
                </div>

                <div className={`p-3 rounded-lg border ${
                  driverSignature ? 'border-success bg-success/10' : 'border-border bg-muted/20'
                }`}>
                  <div className="text-xs font-medium text-muted-foreground mb-1">ลายเซ็นพนักงาน</div>
                  <div className="text-sm font-semibold">
                    {driverSignature ? '✓ พนักงานเซ็นชื่อแล้ว' : 'รอลายเซ็น'}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 4: รับเงิน */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <h2 className="text-xl font-semibold">การชำระเงิน</h2>
            </div>

            <div className="space-y-4">
              {/* ยอดที่ต้องชำระ */}
              <div className="p-4 bg-primary/5 border-primary/20 border rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">ยอดที่ต้องชำระ</span>
                    <span className="font-semibold">25,500 บาท</span>
                  </div>
                  <div className="flex justify-between py-1 border-t pt-2">
                    <span className="text-muted-foreground">จำนวนเงินที่รับจริง</span>
                    <span className="font-bold text-primary text-base">
                      {paymentAmount ? `${Number(paymentAmount).toLocaleString()} บาท` : '-'}
                    </span>
                  </div>
                  {paymentAmount && Number(paymentAmount) !== 25500 && (
                    <div className="flex justify-between py-1 bg-warning/10 px-2 rounded">
                      <span className="text-xs text-warning-foreground">ส่วนต่าง</span>
                      <span className="text-xs font-semibold text-warning-foreground">
                        {(Number(paymentAmount) - 25500).toLocaleString()} บาท
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* วิธีชำระเงิน */}
              <div>
                <div className="text-sm font-medium mb-2">วิธีชำระเงิน</div>
                <div className={`p-3 rounded-lg border ${
                  paymentMethod ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'
                }`}>
                  <span className="text-sm font-semibold">
                    {paymentMethod === 'CASH' && 'เงินสด'}
                    {paymentMethod === 'TRANSFER' && 'โอนเงิน'}
                    {paymentMethod === 'CREDIT_CARD' && 'บัตรเครดิต'}
                    {!paymentMethod && 'ยังไม่ได้เลือกวิธีชำระ'}
                  </span>
                </div>
              </div>

              {/* สลิปโอนเงิน */}
              {paymentMethod === 'TRANSFER' && (
                <div>
                  <div className="text-sm font-medium mb-2">สลิปโอนเงิน</div>
                  <div className={`p-3 rounded-lg border text-center ${
                    paymentSlip ? 'border-success bg-success/10' : 'border-border bg-muted/20'
                  }`}>
                    {paymentSlip ? (
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm font-semibold text-success-foreground">
                          อัพโหลดสลิปแล้ว
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">ยังไม่ได้อัพโหลดสลิป</span>
                    )}
                  </div>
                </div>
              )}

              {/* หมายเหตุหนี้ค้าง */}
              {paymentAmount && Number(paymentAmount) !== 25500 && (
                <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="text-xs font-medium text-warning-foreground">
                    {Number(paymentAmount) < 25500 
                      ? '→ จะบันทึกเป็นหนี้ค้างชำระ (เดบิต)'
                      : '→ จะบันทึกเป็นเครดิตให้ลูกค้า'}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
