'use client'

import React, { useState, useRef } from 'react'
import { MobileView } from '@/components/delivery/mobile-view'
import { DesktopView } from '@/components/delivery/desktop-view'
import { Button } from '@/components/ui/button'
import { Monitor, Smartphone } from 'lucide-react'
import type {
  Step,
  VehicleCondition,
  Damage,
  Expense,
} from '@/components/delivery/types'

export default function DeliveryTaskPage() {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile')
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
  }

  return (
    <div className="relative">
      {/* View Mode Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')}
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl"
          title={`Switch to ${viewMode === 'mobile' ? 'Desktop' : 'Mobile'} View`}
        >
          {viewMode === 'mobile' ? (
            <Monitor className="h-6 w-6" />
          ) : (
            <Smartphone className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Render Views */}
      {viewMode === 'mobile' ? <MobileView {...commonProps} /> : <DesktopView {...commonProps} />}
    </div>
  )
}
