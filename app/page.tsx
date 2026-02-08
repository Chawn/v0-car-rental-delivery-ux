'use client'

import React, { useState, useRef } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { HomePage } from '@/components/pages/home-page'
import { MobileView } from '@/components/delivery/mobile-view'
import { DesktopView } from '@/components/delivery/desktop-view'
import { TaskQueue } from '@/components/delivery/task-queue'
import type {
  Step,
  VehicleCondition,
  Damage,
  Expense,
} from '@/components/delivery/types'

type PageMode = 'home' | 'queue'
type ViewMode = 'list' | 'detail' | 'action'

export default function DeliveryTaskPage() {
  const [pageMode, setPageMode] = useState<PageMode>('home')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedTaskId, setSelectedTaskId] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [startMileage, setStartMileage] = useState('')
  const [startFuelLevel, setStartFuelLevel] = useState('')
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
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'TRANSFER' | 'CREDIT_CARD' | ''>(
    ''
  )
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setVehiclePhotos([...vehiclePhotos, ...newPhotos])
    }
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setNewExpense({ ...newExpense, receiptUrl: url })
    }
  }

  const handleAddExpense = () => {
    if (newExpense.amount) {
      setExpenses([...expenses, newExpense])
      setNewExpense({
        type: 'TAXI',
        amount: '',
        description: '',
        receiptUrl: '',
      })
    }
  }

  const handleRemoveExpense = (idx: number) => {
    setExpenses(expenses.filter((_, i) => i !== idx))
  }

  const handleNavigate = (page: PageMode) => {
    setPageMode(page)
    if (page === 'queue') {
      setViewMode('list')
    }
    setSelectedTaskId('')
  }

  const handleViewDetail = (taskId: string) => {
    setSelectedTaskId(taskId)
    setViewMode('detail')
  }

  const handleStartDelivery = (taskId: string) => {
    setSelectedTaskId(taskId)
    setCurrentStep(1)
    setViewMode('action')
  }

  const handleBackToQueue = () => {
    setViewMode('list')
    setSelectedTaskId('')
  }

  const handleGoToAction = () => {
    setCurrentStep(1)
    setViewMode('action')
  }

  const commonProps = {
    currentStep,
    setCurrentStep,
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
    onBack: handleBackToQueue,
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar currentPage={pageMode} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Home Page */}
        {pageMode === 'home' && <HomePage />}

        {/* Queue Page with different views */}
        {pageMode === 'queue' && (
          <>
            {/* Task Queue List View */}
            {viewMode === 'list' && (
              <TaskQueue onViewDetail={handleViewDetail} onStartDelivery={handleStartDelivery} />
            )}

            {/* Detail View (Desktop - Read Only) */}
            {viewMode === 'detail' && <DesktopView {...commonProps} onAction={handleGoToAction} />}

            {/* Action View (Mobile - Interactive) */}
            {viewMode === 'action' && <MobileView {...commonProps} />}
          </>
        )}
      </main>
    </div>
  )
}
