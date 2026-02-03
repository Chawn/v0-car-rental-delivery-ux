'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  CheckCircle2, 
  Circle, 
  Car, 
  Camera, 
  MapPin, 
  FileText, 
  PenTool, 
  DollarSign, 
  Receipt,
  Upload,
  ChevronRight,
  ChevronLeft,
  Fuel,
  Gauge,
  Check,
  X,
  AlertCircle,
  Navigation
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4 | 5

interface VehicleCondition {
  windshieldWiper: boolean // แผงปัดน้ำ
  sideMirror: boolean // กระจกมองข้าง
  brakes: boolean // มูลเบรก
  steeringWheel: boolean // พวงมาลัย
  remoteStart: boolean // รีโมทสตาร์ท
  carJack: boolean // แม่แรงรถยนต์
  spareTire: boolean // ยางอะไหล่
  headlights: boolean // ไฟหน้า
  taillights: boolean // ไฟท้าย
  turnSignals: boolean // ไฟเลี้ยว
  engineOil: boolean // น้ำมันเครื่อง
  brakeFluid: boolean // น้ำมันเบรก
}

interface Damage {
  location: string // 'front' | 'back' | 'left' | 'right' | 'top' | 'hood' | 'roof'
  type: 'SCRATCH' | 'DENT' | 'CRACK_MINOR' | 'CRACK_DEEP' | 'MAJOR_DENT' | 'STREAK' | 'OTHER'
  description: string
  photoUrl?: string
}

interface Expense {
  type: 'TAXI' | 'FOOT' | 'FUEL' | 'PARKING' | 'TOLL' | 'OTHER'
  amount: string
  description: string
  receiptUrl?: string
}

const EXPENSE_TYPES = [
  { value: 'TAXI', label: 'แท็กซี่' },
  { value: 'FOOT', label: 'เท้า/รถสาธารณะ' },
  { value: 'FUEL', label: 'น้ำมัน' },
  { value: 'PARKING', label: 'ค่าจอด' },
  { value: 'TOLL', label: 'ค่าทางด่วน' },
  { value: 'OTHER', label: 'อื่นๆ' },
] as const

export default function DeliveryTaskPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [startMileage, setStartMileage] = useState('')
  const [endMileage, setEndMileage] = useState('')
  const [startFuelLevel, setStartFuelLevel] = useState('')
  const [endFuelLevel, setEndFuelLevel] = useState('')
  const [vehicleCondition, setVehicleCondition] = useState<VehicleCondition>({
    windshieldWiper: false,
    sideMirror: false,
    brakes: false,
    steeringWheel: false,
    remoteStart: false,
    carJack: false,
    spareTire: false,
    headlights: false,
    taillights: false,
    turnSignals: false,
    engineOil: false,
    brakeFluid: false,
  })
  const [damages, setDamages] = useState<Damage[]>([])
  const [selectedCarPart, setSelectedCarPart] = useState<string>('')
  const [showDamageForm, setShowDamageForm] = useState(false)
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([])
  const [contractRead, setContractRead] = useState(false)
  const [customerSignature, setCustomerSignature] = useState('')
  const [driverSignature, setDriverSignature] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'TRANSFER' | 'CREDIT_CARD'>('CASH')
  const [paymentSlip, setPaymentSlip] = useState('')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpense, setNewExpense] = useState<Expense>({
    type: 'TAXI',
    amount: '',
    description: '',
    receiptUrl: '',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const receiptInputRef = useRef<HTMLInputElement>(null)

  const progress = (currentStep / 5) * 100

  const steps = [
    { number: 1, title: 'ตรวจสภาพรถ', icon: Car },
    { number: 2, title: 'เดินทาง', icon: MapPin },
    { number: 3, title: 'เซ็นสัญญา', icon: PenTool },
    { number: 4, title: 'รับเงิน', icon: DollarSign },
    { number: 5, title: 'บันทึกค่าใช้จ่าย', icon: Receipt },
  ]

  const canProceedToStep2 = () => {
    return (
      startMileage &&
      startFuelLevel &&
      Object.values(vehicleCondition).every((v) => v) &&
      vehiclePhotos.length >= 1
    )
  }

  const canProceedToStep3 = () => {
    return true // เดินทางถึงแล้ว
  }

  const canProceedToStep4 = () => {
    return contractRead && customerSignature && driverSignature
  }

  const canProceedToStep5 = () => {
    return paymentAmount && paymentMethod
  }

  const canComplete = () => {
    return expenses.length > 0
  }

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.type) {
      setExpenses([...expenses, { ...newExpense }])
      setNewExpense({
        type: 'TAXI',
        amount: '',
        description: '',
        receiptUrl: '',
      })
    }
  }

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // จำลองการอัพโหลดไฟล์
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setVehiclePhotos([...vehiclePhotos, ...newPhotos])
    }
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewExpense({ ...newExpense, receiptUrl: URL.createObjectURL(file) })
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* เลขไมล์และระดับน้ำมัน */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">ข้อมูลรถและน้ำมัน</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startMileage" className="text-sm font-medium">เลขไมล์ปัจจุบัน</Label>
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="startMileage"
                      type="number"
                      placeholder="0"
                      value={startMileage}
                      onChange={(e) => setStartMileage(e.target.value)}
                      className="text-base h-11 border-input"
                    />
                    <span className="text-sm text-muted-foreground min-w-fit">กม.</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startFuel" className="text-sm font-medium">ระดับน้ำมัน (1-8)</Label>
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <Input
                      id="startFuel"
                      type="number"
                      placeholder="1-8"
                      min="1"
                      max="8"
                      value={startFuelLevel}
                      onChange={(e) => setStartFuelLevel(e.target.value)}
                      className="text-base h-11 border-input"
                    />
                    <span className="text-sm text-muted-foreground min-w-fit">/8</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* แผนผังรถ - บันทึกตำแหน่งความเสียหาย */}
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">แผนผังตรวจสอบสภาพรถ</h3>
              <p className="text-xs text-muted-foreground mb-4">แตะบริเวณที่มีความเสียหายเพื่อบันทึก</p>
              
              <div className="relative bg-muted/30 rounded-lg p-6 min-h-[280px]">
                {/* Car Diagram - Simplified version */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Top and Front Views */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedCarPart('หลังคา')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      หลังคา (TOP)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCarPart('หน้ารถ')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      หน้ารถ (FRONT)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCarPart('ท้ายรถ')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      ท้ายรถ (BACK)
                    </button>
                  </div>
                  
                  {/* Side Views */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedCarPart('ด้านซ้าย')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      ด้านซ้าย (LEFT)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCarPart('ด้านขวา')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      ด้านขวา (RIGHT)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCarPart('กระโปรงหน้า')
                        setShowDamageForm(true)
                      }}
                      className="w-full p-3 border-2 border-dashed rounded-lg hover:bg-accent/50 transition-all text-sm font-medium"
                    >
                      กระโปรงหน้า (HOOD)
                    </button>
                  </div>
                </div>
              </div>

              {/* Damage Type Legend */}
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <p className="text-xs font-semibold mb-2">ประเภทความเสียหาย:</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div>A. รอยขูดข่วน</div>
                  <div>B. รอยกระแทก</div>
                  <div>C. บุบแตกน้อย-ลึก</div>
                  <div>D. รอยบุบมาก</div>
                  <div>E. รอยริ้ว</div>
                  <div>F. อื่นๆ</div>
                </div>
              </div>

              {/* Form บันทึกความเสียหาย */}
              {showDamageForm && (
                <div className="mt-4 p-4 border-2 border-primary/30 bg-primary/5 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">บันทึกความเสียหาย: {selectedCarPart}</h4>
                    <button onClick={() => setShowDamageForm(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">ประเภทความเสียหาย</Label>
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
                          className="text-xs h-8 bg-transparent"
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
                </div>
              )}

              {/* รายการความเสียหายที่บันทึก */}
              {damages.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-medium">รายการความเสียหาย ({damages.length})</Label>
                  {damages.map((damage, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg text-sm"
                    >
                      <div>
                        <span className="font-medium">{damage.location}</span>
                        <span className="text-muted-foreground mx-2">-</span>
                        <span className="text-warning-foreground">{damage.description}</span>
                      </div>
                      <button
                        onClick={() => setDamages(damages.filter((_, i) => i !== idx))}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Checklist รายละเอียด */}
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Checklist อุปกรณ์และสภาพรถ</h3>
              <div className="space-y-2">
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
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                        checked
                          ? 'border-success bg-success/10'
                          : 'border-border hover:bg-accent/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{labels[key]}</span>
                      {checked ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  )
                })}
              </div>
            </Card>

            {/* ถ่ายรูปสภาพรถ */}
            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">ถ่ายรูปสภาพรถ</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 text-sm font-medium"
              >
                <Camera className="mr-2 h-5 w-5" />
                ถ่ายรูป / อัพโหลด
              </Button>
              {vehiclePhotos.length > 0 && (
                <>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {vehiclePhotos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden shadow-sm">
                        <img src={photo || "/placeholder.svg"} alt={`รูปรถ ${idx + 1}`} className="object-cover w-full h-full" />
                        <button
                          onClick={() => setVehiclePhotos(vehiclePhotos.filter((_, i) => i !== idx))}
                          className="absolute top-1.5 right-1.5 p-1 bg-destructive rounded-full shadow-sm"
                        >
                          <X className="h-4 w-4 text-destructive-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-success flex items-center gap-1.5 mt-3">
                    <Check className="h-4 w-4" />
                    อัพโหลดแล้ว {vehiclePhotos.length} รูป
                  </p>
                </>
              )}
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {/* Map Direction */}
            <Card className="overflow-hidden shadow-sm">
              <div className="relative aspect-[16/9] bg-muted">
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
              <div className="p-4 bg-card border-t">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">123 ถนนสุขุมวิท กรุงเทพฯ</p>
                    <p className="text-xs text-muted-foreground mt-1">ระยะทาง: 12.5 กม. | เวลา: 25 นาที</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 bg-transparent"
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=13.744677,100.560704', '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    นำทาง
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 text-center space-y-4 shadow-sm">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">กำลังเดินทางไปส่งรถ</h2>
                <p className="text-muted-foreground text-sm">
                  เมื่อถึงสถานที่แล้ว กดปุ่ม "ถึงที่หมายแล้ว"
                </p>
              </div>
            </Card>
            
            <Card className="p-5 space-y-3 shadow-sm">
              <h3 className="font-semibold text-base mb-3">รายละเอียดการส่งรถ</h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">เวลานัดหมาย</span>
                  <span className="font-medium text-sm">14:00 น.</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">ชื่อลูกค้า</span>
                  <span className="font-medium text-sm">คุณสมชาย ใจดี</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">เบอร์ติดต่อ</span>
                  <span className="font-medium text-sm">082-xxx-xxxx</span>
                </div>
              </div>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {/* สรุปค่าใช้จ่ายแบบใบเสร็จ */}
            <Card className="p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-center">สรุปค่าใช้จ่าย</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span>ค่าเช่ารถ (7 วัน)</span>
                  <span className="font-medium">15,000 บาท</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span>ค่าส่งรถ</span>
                  <span className="font-medium">500 บาท</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span>เงินประกัน (คืนเมื่อคืนรถ)</span>
                  <span className="font-medium">10,000 บาท</span>
                </div>
                <div className="flex justify-between py-2 border-b-2 border-border">
                  <span>ค่าบริการเพิ่มเติม</span>
                  <span className="font-medium">0 บาท</span>
                </div>
                <div className="flex justify-between py-3 bg-primary/10 px-3 rounded-lg mt-2">
                  <span className="font-bold text-base">ยอดรวมทั้งสิ้น</span>
                  <span className="font-bold text-primary text-base">25,500 บาท</span>
                </div>
              </div>
            </Card>

            {/* ตารางค่าปรับ */}
            <Card className="p-5 shadow-sm">
              <h3 className="text-base font-semibold mb-3">อัตราค่าปรับกรณีเกิดความเสียหาย</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">(A) รอยขูดข่วน</span>
                  <span className="font-medium">500-1,000 บาท</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">(B) รอยกระตุก-ตอก</span>
                  <span className="font-medium">700-3,000 บาท</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">(C) รอยบุบเล็กน้อย</span>
                  <span className="font-medium">500 บาท</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">(D) รอยบุบมาก</span>
                  <span className="font-medium">1,000-3,000 บาท</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/30">
                  <span className="text-muted-foreground">(E) รอยริ้ว</span>
                  <span className="font-medium">700-3,000 บาท</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">(F) อื่นๆ</span>
                  <span className="font-medium">ตามเกณฑ์</span>
                </div>
              </div>
            </Card>

            {/* สัญญาเช่ารถ - ขยายขนาด */}
            <Card className="p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="h-5 w-5 text-primary mt-1" />
                <h2 className="text-lg font-semibold">สัญญาเช่ารถยนต์</h2>
              </div>
              <ScrollArea className="h-[400px] w-full rounded-lg border border-border p-4 bg-muted/30">
                <div className="text-sm leading-relaxed space-y-4">
                  <p className="font-semibold">
                    สัญญาเช่ารถยนต์ฉบับนี้ทำขึ้นระหว่าง บริษัท ABC เช่ารถ จำกัด ("ผู้ให้เช่า") 
                    และ คุณสมชาย ใจดี ("ผู้เช่า") ตกลงทำสัญญาเช่ารถยนต์ดังต่อไปนี้
                  </p>
                  
                  <div>
                    <p className="font-semibold mb-1">ข้อ 1: ข้อมูลรถยนต์</p>
                    <p>ผู้ให้เช่าตกลงให้เช่า และผู้เช่าตกลงเช่ารถยนต์ยี่ห้อ Toyota รุ่น Camry 
                    หมายเลขทะเบียน กก-1234 กรุงเทพมหานคร สีดำ เลขตัวถัง: ABC123456789</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 2: ระยะเวลาการเช่า</p>
                    <p>ระยะเวลาการเช่าตั้งแต่วันที่ 3 กุมภาพันธ์ 2026 เวลา 14:00 น. 
                    ถึงวันที่ 10 กุมภาพันธ์ 2026 เวลา 14:00 น. รวม 7 วัน</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 3: ค่าเช่าและค่าใช้จ่าย</p>
                    <p>• ค่าเช่ารถ: 15,000 บาท (หนึ่งหมื่นห้าพันบาทถ้วน)<br />
                    • ค่าส่งรถ: 500 บาท<br />
                    • เงินประกัน: 10,000 บาท (คืนเมื่อส่งคืนรถในสภาพดี)<br />
                    • ยอดรวมทั้งสิ้น: 25,500 บาท</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 4: เงินประกัน</p>
                    <p>ผู้เช่าต้องวางเงินประกัน 10,000 บาท ซึ่งจะคืนให้เมื่อคืนรถในสภาพสมบูรณ์ 
                    หากรถเกิดความเสียหายระหว่างการเช่า ผู้ให้เช่ามีสิทธิหักเงินประกันเพื่อซ่อมแซม</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 5: ความรับผิดชอบของผู้เช่า</p>
                    <p>• ผู้เช่าต้องรับผิดชอบในความเสียหายที่เกิดขึ้นกับรถขณะอยู่ในความครอบครอง<br />
                    • ห้ามนำรถไปใช้ในทางที่ผิดกฎหมาย<br />
                    • ห้ามให้บุคคลอื่นขับรถโดยไม่ได้รับอนุญาต<br />
                    • ต้องดูแลรถให้อยู่ในสภาพดี และตรวจเช็กน้ำมันเครื่องเป็นประจำ</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 6: อัตราค่าปรับกรณีเกิดความเสียหาย</p>
                    <p>• รอยขูดข่วน (A): 500-1,000 บาท<br />
                    • รอยกระตุก-ตอก (B): 700-3,000 บาท<br />
                    • รอยบุบเล็กน้อย (C): 500 บาท<br />
                    • รอยบุบมาก (D): 1,000-3,000 บาท<br />
                    • รอยริ้ว (E): 700-3,000 บาท<br />
                    • อื่นๆ (F): ตามราคาจริงในการซ่อม</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 7: การคืนรถ</p>
                    <p>ผู้เช่าต้องคืนรถในสภาพเดียวกับตอนรับรถ พร้อมน้ำมันเต็มถัง 
                    หากคืนรถล่าช้ากว่าเวลาที่กำหนด จะมีค่าปรับชั่วโมงละ 500 บาท</p>
                  </div>

                  <div>
                    <p className="font-semibold mb-1">ข้อ 8: การบอกเลิกสัญญา</p>
                    <p>หากผู้เช่าประสงค์จะยกเลิกสัญญา ต้องแจ้งล่วงหน้าอย่างน้อย 3 วัน 
                    มิฉะนั้นจะถูกริบเงินมัดจำทั้งหมด</p>
                  </div>

                  <p className="pt-4 border-t border-border/50">
                    ผู้เช่าและผู้ให้เช่าได้อ่านและเข้าใจข้อตกลงทั้งหมดแล้ว 
                    จึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน
                  </p>
                </div>
              </ScrollArea>
              
              <button
                onClick={() => setContractRead(!contractRead)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border mt-4 transition-all ${
                  contractRead
                    ? 'border-success bg-success/10'
                    : 'border-border hover:bg-accent/50'
                }`}
              >
                <span className="font-medium text-sm">ข้าพเจ้าได้อ่านและเข้าใจสัญญาแล้ว</span>
                {contractRead ? (
                  <CheckCircle2 className="h-6 w-6 text-success" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </button>
            </Card>

            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">ลายเซ็นลูกค้า</h3>
              <div className="border-2 border-dashed rounded-lg p-6 bg-muted/20 min-h-32 flex items-center justify-center">
                {customerSignature ? (
                  <div className="text-center space-y-2">
                    <Check className="h-8 w-8 text-success mx-auto" />
                    <p className="text-sm text-success font-medium">ลูกค้าเซ็นชื่อแล้ว</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCustomerSignature('')}
                    >
                      เซ็นใหม่
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCustomerSignature('signed-' + Date.now())}
                  >
                    <PenTool className="mr-2 h-4 w-4" />
                    เปิดแพดเซ็นชื่อ
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">ลายเซ็นพนักงานส่ง</h3>
              <div className="border-2 border-dashed rounded-lg p-6 bg-muted/20 min-h-32 flex items-center justify-center">
                {driverSignature ? (
                  <div className="text-center space-y-2">
                    <Check className="h-8 w-8 text-success mx-auto" />
                    <p className="text-sm text-success font-medium">คุณเซ็นชื่อแล้ว</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setDriverSignature('')}
                    >
                      เซ็นใหม่
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDriverSignature('signed-' + Date.now())}
                  >
                    <PenTool className="mr-2 h-4 w-4" />
                    เปิดแพดเซ็นชื่อ
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">สรุปยอดชำระ</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">ค่าเช่ารถ</span>
                  <span className="font-medium">15,000 บาท</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">ค่าส่งรถ</span>
                  <span className="font-medium">500 บาท</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">เงินประกัน</span>
                  <span className="font-medium">10,000 บาท</span>
                </div>
                <div className="flex items-center justify-between text-base pt-2">
                  <span className="font-semibold">ยอดรวมทั้งสิ้น</span>
                  <span className="font-bold text-primary text-lg">25,500 บาท</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-sm">
              <Label htmlFor="amount" className="text-sm font-medium mb-3 block">จำนวนเงินที่รับจริง</Label>
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="text-base h-11 border-input"
                />
                <span className="text-sm text-muted-foreground min-w-fit">บาท</span>
              </div>
              
              {paymentAmount && Number(paymentAmount) !== 25500 && (
                <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-warning-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-medium text-warning-foreground">
                      จำนวนเงินไม่ตรงกับยอดที่ต้องชำระ
                    </p>
                    <p className="text-warning-foreground/80 mt-0.5">
                      ส่วนต่าง: {(Number(paymentAmount) - 25500).toLocaleString()} บาท
                    </p>
                    <p className="text-warning-foreground/80 mt-1">
                      {Number(paymentAmount) < 25500 
                        ? '→ จะบันทึกเป็นหนี้ค้างชำระ (เดบิต)'
                        : '→ จะบันทึกเป็นเครดิตให้ลูกค้า'}
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 shadow-sm">
              <Label className="text-sm font-medium mb-3 block">วิธีชำระเงิน</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'CASH', label: 'เงินสด' },
                  { value: 'TRANSFER', label: 'โอนเงิน' },
                  { value: 'CREDIT_CARD', label: 'บัตรเครดิต' },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value as any)}
                    className={`p-3.5 rounded-lg border font-medium text-sm transition-all ${
                      paymentMethod === method.value
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
              
              {paymentMethod === 'TRANSFER' && (
                <div className="mt-4 space-y-3">
                  <Label className="text-sm font-medium mb-2 block">สลิปโอนเงิน</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      ref={receiptInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleReceiptUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 text-sm font-medium bg-transparent"
                      onClick={() => receiptInputRef.current?.click()}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      ถ่ายรูป
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 text-sm font-medium bg-transparent"
                      onClick={() => setPaymentSlip('slip-' + Date.now())}
                    >
                      <Upload className="mr-2 h-4 w-4" />
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
            </Card>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">เพิ่มค่าใช้จ่าย</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">ประเภทค่าใช้จ่าย</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {EXPENSE_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setNewExpense({ ...newExpense, type: type.value })}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          newExpense.type === type.value
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border hover:bg-accent/50'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expenseAmount" className="text-sm font-medium">จำนวนเงิน</Label>
                  <Input
                    id="expenseAmount"
                    type="number"
                    placeholder="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="h-11 border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">รายละเอียด (ถ้ามี)</Label>
                  <Textarea
                    id="description"
                    placeholder="ระบุรายละเอียดเพิ่มเติม..."
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    rows={2}
                    className="border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">รูปใบเสร็จ (ถ้ามี)</Label>
                  <input
                    ref={receiptInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleReceiptUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => receiptInputRef.current?.click()}
                    className="w-full h-11 text-sm font-medium"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {newExpense.receiptUrl ? 'ถ่ายรูปแล้ว ✓' : 'ถ่ายรูปใบเสร็จ'}
                  </Button>
                </div>

                <Button
                  onClick={handleAddExpense}
                  className="w-full h-11 text-sm font-medium"
                  disabled={!newExpense.amount}
                >
                  เพิ่มรายการ
                </Button>
              </div>
            </Card>

            {expenses.length > 0 && (
              <>
                <Card className="p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">รายการค่าใช้จ่าย</h3>
                    <Badge variant="secondary" className="font-medium">
                      {expenses.length} รายการ
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {expenses.map((expense, idx) => (
                      <div key={idx} className="flex items-start justify-between p-4 rounded-lg border border-border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-medium">
                              {EXPENSE_TYPES.find((t) => t.value === expense.type)?.label}
                            </Badge>
                            <span className="font-semibold text-sm">{expense.amount} บาท</span>
                          </div>
                          {expense.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {expense.description}
                            </p>
                          )}
                          {expense.receiptUrl && (
                            <p className="text-xs text-success mt-1.5 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              มีรูปใบเสร็จ
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveExpense(idx)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base">รวมค่าใช้จ่าย</span>
                    <span className="font-bold text-primary text-lg">
                      {expenses.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString()} บาท
                    </span>
                  </div>
                </Card>
              </>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card shadow-md">
        <div className="container max-w-2xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">งานส่งรถ #DT20260203001</h1>
              <p className="text-sm text-muted-foreground mt-1">Toyota Camry - กก 1234</p>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1.5 font-medium">
              {currentStep}/5
            </Badge>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Step Indicator */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            
            return (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number as Step)}
                className="flex flex-col items-center flex-1 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div
                  className={`h-11 w-11 rounded-full flex items-center justify-center transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center font-medium leading-tight ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-2xl mx-auto px-4 py-4">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-2xl">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentStep((currentStep - 1) as Step)}
                className="flex-1 h-12 text-sm font-medium"
              >
                <ChevronLeft className="mr-1.5 h-5 w-5" />
                ย้อนกลับ
              </Button>
            )}
            {currentStep < 5 ? (
              <Button
                size="lg"
                onClick={() => setCurrentStep((currentStep + 1) as Step)}
                className="flex-1 h-12 text-sm font-medium shadow-md"
              >
                {currentStep === 2 ? 'ถึงที่หมายแล้ว' : 'ถัดไป'}
                <ChevronRight className="ml-1.5 h-5 w-5" />
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => alert('บันทึกงานส่งรถเรียบร้อย!')}
                className="flex-1 h-12 text-sm font-medium bg-success hover:bg-success/90 text-success-foreground shadow-md"
              >
                <Check className="mr-1.5 h-5 w-5" />
                เสร็จสิ้นงาน
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
