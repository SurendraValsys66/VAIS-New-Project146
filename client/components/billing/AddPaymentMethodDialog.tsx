import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  AlertCircle,
  Check,
  Zap,
} from "lucide-react";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "Mexico",
  "Singapore",
  "Netherlands",
  "Sweden",
  "Switzerland",
];

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "paypal" | "bank_transfer";
  cardNetwork?: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
  lastUsed: string;
  status: "active" | "expired" | "inactive";
  autopayEnabled: boolean;
}

interface AddPaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  country: string;
  paypalEmail: string;
}

interface ValidationError {
  field: keyof AddPaymentFormData;
  message: string;
}

const getCardNetworkFromNumber = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, "");
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) return "Visa";
  if (/^5[1-5][0-9]{14}$/.test(number)) return "Mastercard";
  if (/^3[47][0-9]{13}$/.test(number)) return "American Express";
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(number)) return "Discover";
  return "";
};

const getCardBgGradient = (cardNetwork?: string): string => {
  switch (cardNetwork) {
    case "Visa":
      return "from-blue-600 via-blue-500 to-cyan-500";
    case "Mastercard":
      return "from-red-600 via-orange-500 to-yellow-500";
    case "American Express":
      return "from-slate-800 via-slate-700 to-slate-900";
    case "Discover":
      return "from-orange-600 via-orange-500 to-red-500";
    default:
      return "from-gray-700 via-gray-600 to-gray-800";
  }
};

function CardPreview({
  cardNumber,
  cardholderName,
  expiryDate,
  cardNetwork,
}: {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cardNetwork?: string;
}) {
  const displayNumber = cardNumber
    .replace(/\s/g, "")
    .padEnd(16, "0")
    .replace(/(\d{4})/g, "$1 ")
    .trim();

  return (
    <div
      className={`relative h-48 rounded-2xl bg-gradient-to-br ${getCardBgGradient(cardNetwork)} shadow-2xl overflow-hidden flex flex-col justify-between p-6 text-white transform transition-all duration-300 hover:scale-105 group`}
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white opacity-5 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white opacity-5 group-hover:opacity-10 transition-opacity"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="text-sm font-bold opacity-90 tracking-widest">{cardNetwork || "CARD"}</div>
        <svg
          className="w-10 h-10 opacity-80"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1" stroke="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="font-mono text-xl font-bold tracking-wider">
          {displayNumber}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white border-opacity-20">
          <div className="space-y-1">
            <div className="text-xs font-semibold opacity-70 uppercase tracking-wide">Card Holder</div>
            <div className="font-semibold text-sm uppercase truncate">
              {cardholderName || "YOUR NAME"}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-xs font-semibold opacity-70 uppercase tracking-wide">Expires</div>
            <div className="font-mono font-bold text-sm">
              {expiryDate || "MM/YY"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function validateCardForm(data: AddPaymentFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.cardholderName.trim()) {
    errors.push({
      field: "cardholderName",
      message: "Cardholder name is required",
    });
  }

  const cardNumber = data.cardNumber.replace(/\s/g, "");
  if (!cardNumber || cardNumber.length < 13) {
    errors.push({ field: "cardNumber", message: "Invalid card number" });
  }

  if (!data.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    errors.push({
      field: "expiryDate",
      message: "Use MM/YY format",
    });
  }

  if (!data.cvc || data.cvc.length < 3) {
    errors.push({ field: "cvc", message: "Invalid CVC" });
  }

  return errors;
}

function validatePayPalForm(data: AddPaymentFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.paypalEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push({
      field: "paypalEmail",
      message: "Please enter a valid email address",
    });
  }

  return errors;
}

export function AddPaymentMethodDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (method: PaymentMethod) => void;
}) {
  const [paymentType, setPaymentType] = useState<"card" | "paypal">("card");
  const [formData, setFormData] = useState<AddPaymentFormData>({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    country: "United States",
    paypalEmail: "",
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardNetwork = useMemo(
    () => getCardNetworkFromNumber(formData.cardNumber),
    [formData.cardNumber],
  );

  const getErrorMessage = (field: keyof AddPaymentFormData): string => {
    return errors.find((e) => e.field === field)?.message || "";
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, "");
    value = value.replace(/[^\d]/g, "");
    value = value.slice(0, 19);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    setFormData({ ...formData, cardNumber: value });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setFormData({ ...formData, expiryDate: value });
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setFormData({ ...formData, cvc: value });
  };

  const handleAddCard = async () => {
    const validationErrors = validateCardForm(formData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "credit_card",
      cardNetwork: cardNetwork || "Card",
      cardNumber: formData.cardNumber.slice(-4),
      expiryDate: formData.expiryDate,
      cardholderName: formData.cardholderName,
      isDefault: false,
      lastUsed: new Date().toISOString().split("T")[0],
      status: "active",
      autopayEnabled: true,
    };

    onAdd(newMethod);
    resetForm();
    onOpenChange(false);
    setIsSubmitting(false);
  };

  const handleAddPayPal = async () => {
    const validationErrors = validatePayPalForm(formData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "paypal",
      cardNumber: formData.paypalEmail,
      expiryDate: "",
      cardholderName: "PayPal Account",
      isDefault: false,
      lastUsed: new Date().toISOString().split("T")[0],
      status: "active",
      autopayEnabled: true,
    };

    onAdd(newMethod);
    resetForm();
    onOpenChange(false);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      country: "United States",
      paypalEmail: "",
    });
    setErrors([]);
    setPaymentType("card");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Payment Method
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Choose your preferred payment method to get started
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setPaymentType("card");
                setErrors([]);
              }}
              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                paymentType === "card"
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`p-3 rounded-xl transition-all transform ${
                    paymentType === "card"
                      ? "bg-blue-500 text-white scale-110 shadow-lg"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">Card</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Visa, Mastercard, Amex
                  </p>
                </div>
              </div>
              {paymentType === "card" && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-1.5 shadow-lg animate-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => {
                setPaymentType("paypal");
                setErrors([]);
              }}
              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                paymentType === "paypal"
                  ? "border-blue-700 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`p-3 rounded-xl transition-all transform ${
                    paymentType === "paypal"
                      ? "bg-blue-600 text-white scale-110 shadow-lg"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 4-.04.22a.805.805 0 01-.794.68h-2.31a.626.626 0 01-.625-.7l.236-1.49.32-2.03.158-1c.047-.3.318-.508.626-.508h1.04c3.238 0 5.774-1.314 6.514-5.12.74-3.807-.236-5.428-2.55-5.428h-4.166L7.944 4.24a.805.805 0 01-.794-.68l-.04-.22a.626.626 0 01.625-.7h2.31a.805.805 0 01.794.68l.04.22 1.342 8.513h1.575c3.238 0 5.774 1.314 6.514 5.12.373 1.903.04 3.327-.743 4.64z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">PayPal</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Fast and secure
                  </p>
                </div>
              </div>
              {paymentType === "paypal" && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-1.5 shadow-lg animate-bounce">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {paymentType === "card" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">1</span>
                    Card Number
                  </label>
                  <div className="relative group">
                    <Input
                      placeholder="1234 1234 1234 1234"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      className={`h-12 text-base font-mono tracking-wider transition-all border-2 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 ${
                        getErrorMessage("cardNumber")
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      maxLength={19}
                    />
                    {cardNetwork && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-fade-in">
                        <div className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-xs font-bold text-white shadow-lg">
                          {cardNetwork}
                        </div>
                      </div>
                    )}
                  </div>
                  {getErrorMessage("cardNumber") && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{getErrorMessage("cardNumber")}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Expires</label>
                    <Input
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleExpiryChange}
                      className={`h-12 text-lg font-mono font-bold tracking-widest transition-all border-2 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 ${
                        getErrorMessage("expiryDate")
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      maxLength={5}
                    />
                    {getErrorMessage("expiryDate") && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-red-600 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{getErrorMessage("expiryDate")}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">CVC</label>
                    <Input
                      placeholder="123"
                      value={formData.cvc}
                      onChange={handleCvcChange}
                      className={`h-12 text-lg font-mono font-bold tracking-widest transition-all border-2 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 ${
                        getErrorMessage("cvc")
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      maxLength={4}
                    />
                    {getErrorMessage("cvc") && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-red-600 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{getErrorMessage("cvc")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Cardholder Name</label>
                  <Input
                    placeholder="Full name on card"
                    value={formData.cardholderName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardholderName: e.target.value,
                      })
                    }
                    className={`h-12 transition-all border-2 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 ${
                      getErrorMessage("cardholderName")
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  {getErrorMessage("cardholderName") && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{getErrorMessage("cardholderName")}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Country or Region</label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCard}
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span>Add Card</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}

          {paymentType === "paypal" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">
                      Secure & Fast Payment
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      PayPal securely handles your payment without sharing card details
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">1</span>
                  PayPal Email Address
                </label>
                <Input
                  placeholder="your-email@example.com"
                  type="email"
                  value={formData.paypalEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, paypalEmail: e.target.value })
                  }
                  className={`h-12 text-base transition-all border-2 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-30 ${
                    getErrorMessage("paypalEmail")
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                {getErrorMessage("paypalEmail") && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{getErrorMessage("paypalEmail")}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 font-semibold text-gray-700 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPayPal}
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 disabled:opacity-50 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span>Add PayPal</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
