"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { OrderData, TaskType, Duration, PaymentMethod } from "@/types";
import { calculatePrice } from "@/utils/helpers";

interface OrderContextType {
  order: OrderData;
  setTaskType: (taskType: TaskType) => void;
  setDuration: (duration: Duration) => void;
  setUserDetails: (details: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    description: string;
    attachmentFile?: File | null;
    attachmentFileName?: string;
  }) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrder: OrderData = {
  taskType: null,
  duration: null,
  fullName: "",
  phoneNumber: "",
  email: "",
  address: "",
  description: "",
  attachmentFile: null,
  attachmentFileName: "",
  paymentMethod: null,
  basePrice: 0,
  multiplier: 0,
  totalPrice: 0,
};

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<OrderData>(initialOrder);

  const setTaskType = useCallback((taskType: TaskType) => {
    setOrder((prev) => {
      const newOrder = { ...prev, taskType };
      if (newOrder.duration) {
        newOrder.totalPrice = calculatePrice(taskType, newOrder.duration);
      }
      return newOrder;
    });
  }, []);

  const setDuration = useCallback((duration: Duration) => {
    setOrder((prev) => {
      const newOrder = { ...prev, duration };
      if (newOrder.taskType) {
        newOrder.totalPrice = calculatePrice(newOrder.taskType, duration);
      }
      return newOrder;
    });
  }, []);

  const setUserDetails = useCallback(
    (details: {
      fullName: string;
      phoneNumber: string;
      email: string;
      address: string;
      description: string;
      attachmentFile?: File | null;
      attachmentFileName?: string;
    }) => {
      setOrder((prev) => ({
        ...prev,
        fullName: details.fullName,
        phoneNumber: details.phoneNumber,
        email: details.email,
        address: details.address,
        description: details.description,
        attachmentFile: details.attachmentFile ?? prev.attachmentFile,
        attachmentFileName:
          details.attachmentFileName ?? prev.attachmentFileName,
      }));
    },
    []
  );

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setOrder((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  }, []);

  const resetOrder = useCallback(() => {
    setOrder(initialOrder);
  }, []);

  const value: OrderContextType = {
    order,
    setTaskType,
    setDuration,
    setUserDetails,
    setPaymentMethod,
    resetOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
}
