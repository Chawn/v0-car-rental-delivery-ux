import React from "react"
export type Step = 1 | 2 | 3 | 4 | 5

export interface VehicleCondition {
  windshieldWiper: boolean
  sideMirror: boolean
  brakes: boolean
  steeringWheel: boolean
  remoteStart: boolean
  carJack: boolean
  spareTire: boolean
  headlights: boolean
  taillights: boolean
  turnSignals: boolean
  engineOil: boolean
  brakeFluid: boolean
}

export interface Damage {
  location: string
  type: 'SCRATCH' | 'DENT' | 'CRACK_MINOR' | 'CRACK_DEEP' | 'MAJOR_DENT' | 'STREAK' | 'OTHER'
  description: string
  photoUrl?: string
}

export interface Expense {
  type: 'TAXI' | 'FOOT' | 'FUEL' | 'PARKING' | 'TOLL' | 'OTHER'
  amount: string
  description: string
  receiptUrl?: string
}

export const EXPENSE_TYPES = [
  { value: 'TAXI', label: 'แท็กซี่' },
  { value: 'FOOT', label: 'เท้า/รถสาธารณะ' },
  { value: 'FUEL', label: 'น้ำมัน' },
  { value: 'PARKING', label: 'ค่าจอด' },
  { value: 'TOLL', label: 'ค่าทางด่วน' },
  { value: 'OTHER', label: 'อื่นๆ' },
] as const

export interface DeliveryViewProps {
  currentStep: Step
  setCurrentStep: (step: Step) => void
  startMileage: string
  setStartMileage: (value: string) => void
  startFuelLevel: string
  setStartFuelLevel: (value: string) => void
  vehicleCondition: VehicleCondition
  setVehicleCondition: (value: VehicleCondition) => void
  damages: Damage[]
  setDamages: (value: Damage[]) => void
  selectedCarPart: string
  setSelectedCarPart: (value: string) => void
  showDamageForm: boolean
  setShowDamageForm: (value: boolean) => void
  vehiclePhotos: string[]
  setVehiclePhotos: (value: string[]) => void
  contractRead: boolean
  setContractRead: (value: boolean) => void
  customerSignature: string
  setCustomerSignature: (value: string) => void
  driverSignature: string
  setDriverSignature: (value: string) => void
  paymentAmount: string
  setPaymentAmount: (value: string) => void
  paymentMethod: 'CASH' | 'TRANSFER' | 'CREDIT_CARD' | ''
  setPaymentMethod: (value: 'CASH' | 'TRANSFER' | 'CREDIT_CARD' | '') => void
  paymentSlip: string
  setPaymentSlip: (value: string) => void
  expenses: Expense[]
  setExpenses: (value: Expense[]) => void
  newExpense: Expense
  setNewExpense: (value: Expense) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  receiptInputRef: React.RefObject<HTMLInputElement>
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleReceiptUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddExpense: () => void
  handleRemoveExpense: (idx: number) => void
  onBack?: () => void
}
