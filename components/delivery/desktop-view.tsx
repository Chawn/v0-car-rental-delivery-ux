'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  CheckCircle2,
  Circle,
  Camera,
  MapPin,
  FileText,
  PenTool,
  DollarSign,
  Upload,
  Fuel,
  Gauge,
  Check,
  X,
  AlertCircle,
  Navigation,
} from 'lucide-react'
import type { DeliveryViewProps } from './types'
import { EXPENSE_TYPES } from './types'

export function DesktopView({
  startMileage,
  setStartMileage,
  startFuelLevel,
  setStartFuelLevel,
  vehicleCondition,
  setVehicleCondition,
  damages,
  setDamages,
  selectedCarPart,
  setSelectedCarPart,
  showDamageForm,
  setShowDamageForm,
  vehiclePhotos,
  setVehiclePhotos,
  contractRead,
  setContractRead,
  customerSignature,
  setCustomerSignature,
  driverSignature,
  setDriverSignature,
  paymentAmount,
  setPaymentAmount,
  paymentMethod,
  setPaymentMethod,
  paymentSlip,
  setPaymentSlip,
  expenses,
  setExpenses,
  newExpense,
  setNewExpense,
  fileInputRef,
  receiptInputRef,
  handleFileUpload,
  handleReceiptUpload,
  handleAddExpense,
  handleRemoveExpense,
}: DeliveryViewProps) {
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
              Desktop View
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
                  <Label htmlFor="mileage" className="text-sm font-medium">
                    เลขไมล์ปัจจุบัน
                  </Label>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="0"
                      value={startMileage}
                      onChange={(e) => setStartMileage(e.target.value)}
                      className="h-10"
                    />
                    <span className="text-sm text-muted-foreground">กม.</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel" className="text-sm font-medium">
                    ระดับน้ำมัน (1-8)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="fuel"
                      type="number"
                      placeholder="1-8"
                      min="1"
                      max="8"
                      value={startFuelLevel}
                      onChange={(e) => setStartFuelLevel(e.target.value)}
                      className="h-10"
                    />
                    <span className="text-sm text-muted-foreground">/8</span>
                  </div>
                </div>
              </div>

              {/* Damage Diagram */}
              <div>
                <Label className="text-sm font-medium mb-3 block">แผนผังตรวจสอบสภาพรถ</Label>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['หลังคา', 'หน้ารถ', 'ท้ายรถ', 'ด้านซ้าย', 'ด้านขวา', 'กระโปรงหน้า'].map(
                      (part) => (
                        <button
                          key={part}
                          onClick={() => {
                            setSelectedCarPart(part)
                            setShowDamageForm(true)
                          }}
                          className="p-2 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-xs font-medium"
                        >
                          {part}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {showDamageForm && (
                  <div className="mt-3 p-3 border-2 border-primary/30 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold">บันทึก: {selectedCarPart}</h4>
                      <button onClick={() => setShowDamageForm(false)}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'SCRATCH', label: 'ขูดข่วน' },
                        { value: 'DENT', label: 'กระแทก' },
                        { value: 'CRACK_MINOR', label: 'แตกน้อย' },
                        { value: 'CRACK_DEEP', label: 'แตกลึก' },
                        { value: 'MAJOR_DENT', label: 'บุบมาก' },
                        { value: 'STREAK', label: 'ริ้ว' },
                      ].map((type) => (
                        <Button
                          key={type.value}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-transparent"
                          onClick={() => {
                            setDamages([
                              ...damages,
                              {
                                location: selectedCarPart,
                                type: type.value as any,
                                description: type.label,
                              },
                            ])
                            setShowDamageForm(false)
                          }}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {damages.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {damages.map((damage, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-warning/10 border border-warning/30 rounded text-xs"
                      >
                        <span>
                          {damage.location} - {damage.description}
                        </span>
                        <button onClick={() => setDamages(damages.filter((_, i) => i !== idx))}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checklist */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Checklist อุปกรณ์</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(vehicleCondition).map(([key, checked]) => {
                    const labels: Record<string, string> = {
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
                      <button
                        key={key}
                        onClick={() =>
                          setVehicleCondition({ ...vehicleCondition, [key]: !checked })
                        }
                        className={`flex items-center justify-between p-2 rounded border transition-all text-xs ${
                          checked
                            ? 'border-success bg-success/10'
                            : 'border-border hover:bg-accent/50'
                        }`}
                      >
                        <span>{labels[key]}</span>
                        {checked ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ถ่ายรูป */}
              <div>
                <Label className="text-sm font-medium mb-3 block">ถ่ายรูปสภาพรถ</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-10 text-sm"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  ถ่ายรูป / อัพโหลด
                </Button>
                {vehiclePhotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {vehiclePhotos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded overflow-hidden">
                        <img
                          src={photo || '/placeholder.svg'}
                          alt={`รูป ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          onClick={() =>
                            setVehiclePhotos(vehiclePhotos.filter((_, i) => i !== idx))
                          }
                          className="absolute top-1 right-1 p-0.5 bg-destructive rounded-full"
                        >
                          <X className="h-3 w-3 text-destructive-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Step 2: เดินทาง */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <h2 className="text-xl font-semibold">เดินทาง</h2>
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

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">123 ถนนสุขุมวิท กรุงเทพฯ</p>
                    <p className="text-xs text-muted-foreground">12.5 กม. | 25 นาที</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Navigation className="h-4 w-4 mr-1" />
                  นำทาง
                </Button>
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
              <h2 className="text-xl font-semibold">บันทึกค่าใช้จ่าย</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {EXPENSE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setNewExpense({ ...newExpense, type: type.value })}
                    className={`p-2 rounded border text-xs font-medium transition-all ${
                      newExpense.type === type.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <Input
                type="number"
                placeholder="จำนวนเงิน"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="h-10"
              />

              <Textarea
                placeholder="รายละเอียด (ถ้ามี)"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                rows={2}
              />

              <Button
                onClick={handleAddExpense}
                className="w-full h-10"
                disabled={!newExpense.amount}
              >
                เพิ่มรายการ
              </Button>

              {expenses.length > 0 && (
                <div className="space-y-2">
                  {expenses.map((expense, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {EXPENSE_TYPES.find((t) => t.value === expense.type)?.label}
                          </Badge>
                          <span className="text-sm font-semibold">{expense.amount} บาท</span>
                        </div>
                        {expense.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {expense.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExpense(idx)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="p-3 bg-primary/5 border-primary/20 border rounded">
                    <div className="flex justify-between font-semibold">
                      <span>รวมค่าใช้จ่าย</span>
                      <span className="text-primary">
                        {expenses.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()}{' '}
                        บาท
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
              <h2 className="text-xl font-semibold">เซ็นสัญญา</h2>
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
              <div className="p-3 bg-muted/30 rounded-lg">
                <h4 className="text-xs font-semibold mb-2">อัตราค่าปรับ</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">(A) รอยขูดข่วน</span>
                    <span>500-1,000฿</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">(B) รอยกระตุก-ตอก</span>
                    <span>700-3,000฿</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">(C) บุบเล็กน้อย</span>
                    <span>500฿</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">(D) บุบมาก</span>
                    <span>1,000-3,000฿</span>
                  </div>
                </div>
              </div>

              {/* สัญญา */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">สัญญาเช่ารถยนต์</Label>
                </div>
                <ScrollArea className="h-[300px] w-full rounded border p-3 bg-muted/30">
                  <div className="text-xs leading-relaxed space-y-3">
                    <p className="font-semibold">
                      สัญญาเช่ารถยนต์ฉบับนี้ทำขึ้นระหว่าง บริษัท ABC เช่ารถ จำกัด และ
                      คุณสมชาย ใจดี
                    </p>
                    <div>
                      <p className="font-semibold">ข้อ 1: ข้อมูลรถยนต์</p>
                      <p>
                        Toyota Camry หมายเลขทะเบียน กก-1234 กรุงเทพมหานคร เลขตัวถัง:
                        ABC123456789
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">ข้อ 2: ระยะเวลาการเช่า</p>
                      <p>
                        3-10 กุมภาพันธ์ 2026 เวลา 14:00 น. รวม 7 วัน
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">ข้อ 3: ค่าเช่า</p>
                      <p>15,000 บาท + ค่าส่งรถ 500 บาท + เงินประกัน 10,000 บาท = 25,500 บาท</p>
                    </div>
                    <div>
                      <p className="font-semibold">ข้อ 4-8:</p>
                      <p>
                        เงินประกันคืนเมื่อรถไม่เสียหาย / ผู้เช่ารับผิดชอบความเสียหาย /
                        อัตราค่าปรับตามตารางข้างต้น / คืนรถล่าช้า 500 บาท/ชม. /
                        ยกเลิกแจ้งล่วงหน้า 3 วัน
                      </p>
                    </div>
                  </div>
                </ScrollArea>

                <button
                  onClick={() => setContractRead(!contractRead)}
                  className={`w-full flex items-center justify-between p-3 rounded border mt-3 transition-all ${
                    contractRead
                      ? 'border-success bg-success/10'
                      : 'border-border hover:bg-accent/50'
                  }`}
                >
                  <span className="text-xs font-medium">อ่านและเข้าใจสัญญาแล้ว</span>
                  {contractRead ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* ลายเซ็น */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium mb-2 block">ลายเซ็นลูกค้า</Label>
                  <div className="border-2 border-dashed rounded p-4 bg-muted/20 min-h-24 flex items-center justify-center">
                    {customerSignature ? (
                      <div className="text-center space-y-1">
                        <Check className="h-6 w-6 text-success mx-auto" />
                        <p className="text-xs text-success">เซ็นแล้ว</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => setCustomerSignature('')}
                        >
                          เซ็นใหม่
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomerSignature('signed-' + Date.now())}
                      >
                        <PenTool className="mr-1 h-3 w-3" />
                        เซ็นชื่อ
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium mb-2 block">ลายเซ็นพนักงาน</Label>
                  <div className="border-2 border-dashed rounded p-4 bg-muted/20 min-h-24 flex items-center justify-center">
                    {driverSignature ? (
                      <div className="text-center space-y-1">
                        <Check className="h-6 w-6 text-success mx-auto" />
                        <p className="text-xs text-success">เซ็นแล้ว</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => setDriverSignature('')}
                        >
                          เซ็นใหม่
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDriverSignature('signed-' + Date.now())}
                      >
                        <PenTool className="mr-1 h-3 w-3" />
                        เซ็นชื่อ
                      </Button>
                    )}
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
              <h2 className="text-xl font-semibold">รับเงิน</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="payAmount" className="text-sm font-medium mb-2 block">
                  จำนวนเงินที่รับจริง
                </Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="payAmount"
                    type="number"
                    placeholder="0"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="h-10"
                  />
                  <span className="text-sm text-muted-foreground">บาท</span>
                </div>

                {paymentAmount && Number(paymentAmount) !== 25500 && (
                  <div className="flex items-start gap-2 p-2 bg-warning/10 border border-warning/30 rounded mt-2">
                    <AlertCircle className="h-4 w-4 text-warning-foreground mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-warning-foreground">
                        ส่วนต่าง: {(Number(paymentAmount) - 25500).toLocaleString()} บาท
                      </p>
                      <p className="text-warning-foreground/80">
                        {Number(paymentAmount) < 25500
                          ? '→ บันทึกเป็นหนี้ค้างชำระ (เดบิต)'
                          : '→ บันทึกเป็นเครดิตให้ลูกค้า'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">วิธีชำระเงิน</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'CASH', label: 'เงินสด' },
                    { value: 'TRANSFER', label: 'โอนเงิน' },
                    { value: 'CREDIT_CARD', label: 'บัตรเครดิต' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentMethod(method.value as any)}
                      className={`p-2 rounded border text-sm font-medium transition-all ${
                        paymentMethod === method.value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:bg-accent/50'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'TRANSFER' && (
                  <div className="mt-3 space-y-2">
                    <Label className="text-xs font-medium">สลิปโอนเงิน</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        ref={receiptInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleReceiptUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => receiptInputRef.current?.click()}
                      >
                        <Camera className="mr-1 h-4 w-4" />
                        ถ่ายรูป
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPaymentSlip('slip-' + Date.now())}
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        อัพโหลด
                      </Button>
                    </div>
                    {paymentSlip && (
                      <p className="text-xs text-success flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        อัพโหลดสลิปแล้ว
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button className="w-full h-11 bg-success hover:bg-success/90 text-success-foreground">
                <Check className="mr-2 h-5 w-5" />
                บันทึกงานส่งรถเสร็จสิ้น
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
