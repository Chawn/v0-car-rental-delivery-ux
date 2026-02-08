'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Car, 
  MapPin, 
  Clock, 
  User, 
  Phone,
  Eye,
  Navigation,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

export interface DeliveryTask {
  id: string
  taskNumber: string
  vehicleBrand: string
  vehicleModel: string
  licensePlate: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  appointmentTime: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  rentalDays: number
  totalAmount: number
  createdAt: string
}

interface TaskQueueProps {
  onViewDetail: (taskId: string) => void
  onStartDelivery: (taskId: string) => void
}

export function TaskQueue({ onViewDetail, onStartDelivery }: TaskQueueProps) {
  // Mock data - ในระบบจริงจะดึงจาก API
  const tasks: DeliveryTask[] = [
    {
      id: '1',
      taskNumber: 'DT20260203001',
      vehicleBrand: 'Toyota',
      vehicleModel: 'Camry',
      licensePlate: 'กก 1234',
      customerName: 'คุณสมชาย ใจดี',
      customerPhone: '082-xxx-xxxx',
      deliveryAddress: '123 ถนนสุขุมวิท กรุงเทพฯ',
      appointmentTime: '14:00 น.',
      status: 'PENDING',
      rentalDays: 7,
      totalAmount: 25500,
      createdAt: '2026-02-03T09:00:00',
    },
    {
      id: '2',
      taskNumber: 'DT20260203002',
      vehicleBrand: 'Honda',
      vehicleModel: 'Civic',
      licensePlate: 'ขข 5678',
      customerName: 'คุณสมหญิง รักดี',
      customerPhone: '089-xxx-xxxx',
      deliveryAddress: '456 ถนนพระราม 4 กรุงเทพฯ',
      appointmentTime: '16:00 น.',
      status: 'PENDING',
      rentalDays: 5,
      totalAmount: 18000,
      createdAt: '2026-02-03T10:30:00',
    },
    {
      id: '3',
      taskNumber: 'DT20260203003',
      vehicleBrand: 'Mazda',
      vehicleModel: 'CX-5',
      licensePlate: 'คค 9012',
      customerName: 'คุณวิชัย มั่งคั่ง',
      customerPhone: '091-xxx-xxxx',
      deliveryAddress: '789 ถนนรัชดาภิเษก กรุงเทพฯ',
      appointmentTime: '10:00 น.',
      status: 'IN_PROGRESS',
      rentalDays: 3,
      totalAmount: 12000,
      createdAt: '2026-02-03T08:00:00',
    },
    {
      id: '4',
      taskNumber: 'DT20260202001',
      vehicleBrand: 'Nissan',
      vehicleModel: 'Almera',
      licensePlate: 'งง 3456',
      customerName: 'คุณศิริพร แสงจันทร์',
      customerPhone: '084-xxx-xxxx',
      deliveryAddress: '321 ถนนพหลโยธิน กรุงเทพฯ',
      appointmentTime: '11:00 น.',
      status: 'COMPLETED',
      rentalDays: 4,
      totalAmount: 15000,
      createdAt: '2026-02-02T09:00:00',
    },
  ]

  const getStatusBadge = (status: DeliveryTask['status']) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="secondary">รอดำเนินการ</Badge>
      case 'IN_PROGRESS':
        return <Badge className="bg-primary text-primary-foreground">กำลังส่ง</Badge>
      case 'COMPLETED':
        return <Badge className="bg-success text-success-foreground">เสร็จสิ้น</Badge>
      case 'CANCELLED':
        return <Badge variant="destructive">ยกเลิก</Badge>
    }
  }

  const pendingTasks = tasks.filter((t) => t.status === 'PENDING')
  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS')
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b shadow-md">
        <div className="container max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">คิวงานส่งรถ</h1>
              <p className="text-sm text-muted-foreground mt-1">
                รายการส่งรถทั้งหมด • วันนี้
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{pendingTasks.length}</p>
                <p className="text-xs text-muted-foreground">รอดำเนินการ</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{inProgressTasks.length}</p>
                <p className="text-xs text-muted-foreground">กำลังส่ง</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{completedTasks.length}</p>
                <p className="text-xs text-muted-foreground">เสร็จสิ้น</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Vehicle Icon */}
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="h-7 w-7 text-primary" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">
                          {task.vehicleBrand} {task.vehicleModel}
                        </h3>
                        <Badge variant="outline" className="font-mono">
                          {task.licensePlate}
                        </Badge>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        เลขที่งาน: {task.taskNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {task.totalAmount.toLocaleString()} บาท
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.rentalDays} วัน
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{task.customerName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {task.customerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm">{task.deliveryAddress}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          นัดหมาย: {task.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetail(task.id)}
                      className="flex-1"
                    >
                      <Eye className="mr-1.5 h-4 w-4" />
                      ดูรายละเอียด
                    </Button>
                    {task.status === 'PENDING' && (
                      <Button
                        size="sm"
                        onClick={() => onStartDelivery(task.id)}
                        className="flex-1"
                      >
                        <Navigation className="mr-1.5 h-4 w-4" />
                        เริ่มส่งรถ
                      </Button>
                    )}
                    {task.status === 'IN_PROGRESS' && (
                      <Button
                        size="sm"
                        onClick={() => onStartDelivery(task.id)}
                        className="flex-1"
                      >
                        <AlertCircle className="mr-1.5 h-4 w-4" />
                        ดำเนินการต่อ
                      </Button>
                    )}
                    {task.status === 'COMPLETED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="flex-1 bg-transparent"
                      >
                        <CheckCircle2 className="mr-1.5 h-4 w-4" />
                        เสร็จสิ้นแล้ว
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
