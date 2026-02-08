'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Home, ClipboardList } from 'lucide-react'

interface SidebarProps {
  currentPage: 'home' | 'queue'
  onNavigate: (page: 'home' | 'queue') => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    {
      id: 'home' as const,
      label: 'หน้าแรก',
      icon: Home,
    },
    {
      id: 'queue' as const,
      label: 'คิวงาน',
      icon: ClipboardList,
    },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* Logo / Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">ระบบส่งรถเช่า</h2>
        <p className="text-xs text-muted-foreground mt-1">SUMMER Car Rental</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 h-11',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium">ผู้ใช้: พนักงานส่งรถ</p>
          <p className="mt-1">เข้าสู่ระบบ: 3 ก.พ. 2026</p>
        </div>
      </div>
    </aside>
  )
}
