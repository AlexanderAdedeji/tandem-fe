'use client'


import React from 'react'
import { CreditCard, Package, Clock, Shield } from 'lucide-react'
const BillingSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Billing & Plans
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Manage your subscription and payment methods
          </p>
        </div>
        <CreditCard className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      {/* Current Plan */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Package className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
            <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Current Plan
            </h3>
          </div>
          <span className="px-3 py-1 bg-[#5855FF]/10 dark:bg-[#FF914D]/10 text-[#5855FF] dark:text-[#FF914D] rounded-full text-sm">
            Pro Plan
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#666] dark:text-[#AAA]">Monthly Price</span>
            <span className="text-[#2E2E2E] dark:text-[#E9E9E9] font-medium">
              $9.99/month
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#666] dark:text-[#AAA]">Renewal Date</span>
            <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
              July 1, 2024
            </span>
          </div>
          <button className="w-full py-3 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium mt-4">
            Upgrade Plan
          </button>
        </div>
      </div>
      {/* Payment Methods */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Payment Methods
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
              <div>
                <p className="text-[#2E2E2E] dark:text-[#E9E9E9] font-medium">
                  •••• 4242
                </p>
                <p className="text-sm text-[#666] dark:text-[#AAA]">
                  Expires 12/24
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded text-sm">
              Default
            </span>
          </div>
          <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-[#666] dark:text-[#AAA] rounded-lg">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  )
}



export default BillingSection